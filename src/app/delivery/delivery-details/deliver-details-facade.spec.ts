import { TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { take } from 'rxjs/operators'
import { DeliveryService } from '../../core/services/delivery/delivery.service'
import { DeliveryServiceMock } from '../../core/services/delivery/delivery.service-mock'
import { DeliverDetailsFacade } from './deliver-details-facade'
import { DirectionsService } from './services/directions/directions.service'
import { DirectionsServiceMock } from './services/directions/directions.service-mock'
import { PlacesService } from './services/places/places.service'
import { PlacesServiceMock } from './services/places/places.service-mock'

describe('DeliverDetailsFacadeService', () => {
  let facade: DeliverDetailsFacade
  let deliveryService: DeliveryService
  let directionsService: DirectionsService
  let placesService: PlacesService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        DeliverDetailsFacade,
        { provide: DeliveryService, useClass: DeliveryServiceMock },
        { provide: DirectionsService, useClass: DirectionsServiceMock },
        { provide: PlacesService, useClass: PlacesServiceMock },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } },
      ],
    })

    facade = TestBed.inject(DeliverDetailsFacade)
    deliveryService = TestBed.inject(DeliveryService)
    directionsService = TestBed.inject(DirectionsService)
    placesService = TestBed.inject(PlacesService)
  })

  it('should be created', () => {
    expect(facade).toBeTruthy()
  })

  describe('courierPosition$', () => {
    beforeEach(() => {
      spyOn(deliveryService, 'findOne').and.returnValue(of({ startLocation: '', endLocation: '' } as any))
    })
    it('from one step should generate 100 checkpoint + 1 undefined', (done) => {
      spyOn(directionsService, 'getDirections').and.returnValue(
        of({
          steps: [{ startLocation: { lat: 1, lng: 1 }, endLocation: { lat: 2, lng: 2 } }],
        } as any),
      )

      const totalLocations = []

      facade.courierPosition$.subscribe({
        next: (location) => totalLocations.push(location),
        complete: () => {
          expect(totalLocations.length).toBe(101)
          done()
        },
      })
    })

    it('last location should be undefined for vehicle disapper', (done) => {
      spyOn(directionsService, 'getDirections').and.returnValue(of({ steps: [] } as any))

      facade.courierPosition$.subscribe({
        next: (location) => expect(location).toBeUndefined(),
        complete: () => done(),
      })
    })
  })

  describe('places$', () => {
    it('should trigger getPlaces on currentPlace valueChange', (done) => {
      spyOn(placesService, 'getPlaces').and.returnValue(of([]))

      facade.places$.pipe(take(1)).subscribe({
        next: () => expect(placesService.getPlaces).toHaveBeenCalledTimes(1),
        complete: () => done(),
      })

      facade.currentPlace.setValue('mock')
    })

    it('should return empty array if the response is null', (done) => {
      spyOn(placesService, 'getPlaces').and.returnValue(of(null))

      facade.places$.pipe(take(1)).subscribe({
        next: (places) => expect(places).toEqual([]),
        complete: () => done(),
      })

      facade.currentPlace.setValue('mock')
    })
  })

  describe('locations$', () => {
    it('should return the startLocation and the endLocation in an array', (done) => {
      spyOn(deliveryService, 'findOne').and.returnValue(of({ startLocation: '', endLocation: '' } as any))
      spyOn(directionsService, 'getDirections').and.returnValue(
        of({
          endLocation: { lat: 48.1009274, lng: 20.8048161 },
          startLocation: { lat: 48.10335, lng: 20.79018 },
        } as any),
      )

      facade.locations$.pipe(take(1)).subscribe({
        next: (locations) =>
          expect(locations).toEqual([
            { lat: 48.10335, lng: 20.79018 },
            { lat: 48.1009274, lng: 20.8048161 },
          ]),
        complete: () => done(),
      })
    })
  })
})
