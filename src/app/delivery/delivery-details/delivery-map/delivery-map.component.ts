import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core'
import { LatLng } from '../models/lat-lng'
declare var google: any

@Component({
  selector: 'app-delivery-map',
  templateUrl: './delivery-map.component.html',
  styleUrls: ['./delivery-map.component.scss'],
})
export class DeliveryMapComponent implements AfterViewInit, OnChanges {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef

  @Input() currentLocation: LatLng
  @Input() locations: LatLng[] = []
  @Input() vehicleIconUrl: string

  map: google.maps.Map

  coordinates = new google.maps.LatLng(48.10434, 20.79166)

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 14,
  }

  movingMarker: google.maps.Marker
  markers: google.maps.Marker[] = []

  constructor() {}

  ngAfterViewInit(): void {
    this.mapInitializer()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentLocation && this.movingMarker) {
      this.movingMarker.setPosition(changes.currentLocation.currentValue)
    }

    if (changes.locations && changes.locations.currentValue != null) {
      this.removeMarkers(this.map)
      this.createMarkers(this.map)
    }

    if (changes.vehicleIconUrl && !changes.vehicleIconUrl.firstChange) {
      this.movingMarker.setMap(null)
      this.movingMarker = this.createMarker(this.map, undefined, this.vehicleIconUrl)
    }
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions)
    this.movingMarker = this.createMarker(this.map, undefined, this.vehicleIconUrl)
  }

  createMarkers(map: google.maps.Map): void {
    this.markers = this.locations.map((location) => {
      const { lat, lng } = location
      return this.createMarker(map, { lat, lng })
    })

    const bounds = new google.maps.LatLngBounds()

    this.markers.forEach((marker) => {
      if (marker.getVisible()) {
        bounds.extend(marker.getPosition())
      }
    })

    this.map.fitBounds(bounds)
  }

  removeMarkers(map: google.maps.Map): void {
    this.markers.forEach((marker) => marker.setMap(null))
  }

  createMarker(map: google.maps.Map, position?, icon?): google.maps.Marker {
    const marker = new google.maps.Marker({
      position,
      map,
      icon,
    })

    marker.setMap(map)

    return marker
  }
}
