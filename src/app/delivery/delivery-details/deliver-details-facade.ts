import { Injectable } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { BehaviorSubject, from, Observable, of } from 'rxjs'
import { concatMap, debounceTime, delay, map, pluck, share, switchMap, take, tap } from 'rxjs/operators'
import { Delivery, DeliveryService } from '../../core/services/delivery/delivery.service'
import { Directions } from './models/directions'
import { LatLng } from './models/lat-lng'
import { Option } from './models/option'
import { Route } from './models/route'
import { DirectionsService } from './services/directions/directions.service'
import { PlacesService } from './services/places/places.service'

type VEHICLE = 'Car' | 'Bike'

@Injectable()
export class DeliverDetailsFacade {
  delivery$: Observable<Delivery>
  courierPosition$: Observable<LatLng>
  locations$: Observable<LatLng[]>
  directions$: Observable<Directions>
  places$: Observable<Option[]>
  selectedAddress$: Observable<string>

  vehicle$ = new BehaviorSubject<VEHICLE>('Car')
  vehicleIcon$ = this.vehicle$.pipe(
    map((vehicle) =>
      vehicle === 'Car'
        ? 'http://maps.google.com/mapfiles/kml/shapes/truck.png'
        : 'http://maps.google.com/mapfiles/kml/shapes/cycling.png',
    ),
  )

  currentPlace = new FormControl()

  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private directionsService: DirectionsService,
    private placesService: PlacesService,
  ) {
    this.delivery$ = this.route.params.pipe(
      pluck('id'),
      switchMap((id) => this.deliveryService.findOne(id)),
      tap((delivery) => {
        this.currentPlace.setValue(delivery.endLocation)
      }),
      share(),
    )

    this.selectedAddress$ = this.delivery$.pipe(pluck('endLocation'))

    this.directions$ = this.delivery$.pipe(
      map((delivery) => ({ startLocation: delivery.startLocation, endLocation: delivery.endLocation })),
      switchMap(({ startLocation, endLocation }) => this.directionsService.getDirections(startLocation, endLocation)),
      share(),
    )

    this.locations$ = this.directions$.pipe(
      map((direction) => [direction.startLocation , direction.endLocation ]),
    )

    this.courierPosition$ = this.directions$.pipe(
      pluck('steps'),
      take(1),
      map((steps) => this.generateLotsOfPointFromLocations(steps)),
      switchMap((tonOfPositions) => from([...tonOfPositions, undefined])),
      concatMap((position) => of(position).pipe(delay(5))),
    )

    this.places$ = this.currentPlace.valueChanges.pipe(
      debounceTime(500),
      switchMap((placesInput) => this.placesService.getPlaces(placesInput)),
      map((places) => (places == null ? [] : places)),
    )
  }

  generateLotsOfPointFromLocations(steps: Route[]): LatLng[] {
    return (steps.map(({ startLocation, endLocation }) => {
      const deltaLat = (endLocation.lat - startLocation.lat) / 100
      const deltaLng = (endLocation.lng - startLocation.lng) / 100

      let lastLocation = startLocation

      return Array(100)
        .fill(1)
        .map(() => {
          const lat = lastLocation.lat + deltaLat
          const lng = lastLocation.lng + deltaLng
          lastLocation = { lat, lng }

          return lastLocation
        })
    }) as any).flat()
  }

  updateEndLocation(id, endLocation): void {
    this.deliveryService.update(id, endLocation)
  }

  updateVehicle(vehicle: VEHICLE): void {
    this.vehicle$.next(vehicle)
  }
}
