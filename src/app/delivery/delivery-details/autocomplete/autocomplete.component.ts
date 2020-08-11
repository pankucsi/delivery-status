import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { Option } from '../models/option'

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent {
  @Input() title: string
  @Input() disableAutocomplete: boolean
  @Input() options: Option[]
  @Input() value: string
  @Input() selectedAddress: string
  @Output() placeSelect = new EventEmitter()
  @Output() valueChange = new EventEmitter()

  isOpened: boolean

  @HostListener('document:click', ['$event']) clickout(event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpened = false
    }
  }

  constructor(private eRef: ElementRef) {}

  select(selectedValue: any): void {
    this.isOpened = false
    this.placeSelect.emit(selectedValue)
  }

  handleValueChange(value): void {
    this.isOpened = true
    this.valueChange.emit(value)
  }
}
