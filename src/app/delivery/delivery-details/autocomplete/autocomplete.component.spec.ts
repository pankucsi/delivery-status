import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing'
import { AutocompleteComponent } from './autocomplete.component'

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent
  let fixture: ComponentFixture<AutocompleteComponent>
  let nativeElement: any

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    nativeElement = fixture.debugElement.nativeElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('read only', () => {
    it('should disable input if disableAutocomplete is true', fakeAsync(() => {
      component.disableAutocomplete = true

      fixture.detectChanges()
      const input = nativeElement.querySelector('.form-control')
      expect(input.readOnly).toBeTruthy()
    }))
  })

  describe('option list', () => {
    it('should show the list if the input has been clicked', fakeAsync(() => {
      const input = nativeElement.querySelector('.form-control')
      input.click()
      fixture.detectChanges()
      const optionList = nativeElement.querySelector('.position-relative.row')
      expect(component.isOpened).toBeTrue()
      expect(optionList).toBeTruthy()
    }))

    it('should not hide the list if the input has been clicked twice', fakeAsync(() => {
      const input = nativeElement.querySelector('.form-control')
      input.click()
      input.click()
      fixture.detectChanges()
      const optionList = nativeElement.querySelector('.position-relative.row')
      expect(component.isOpened).toBeTrue()
      expect(optionList).toBeTruthy()
    }))

    it('should hide option list after one option has been select', fakeAsync(() => {
      component.options = [{ id: '1', name: '1' }]

      const input = nativeElement.querySelector('.form-control')
      input.click()
      fixture.detectChanges()
      const firstOption = nativeElement.querySelector('.border.option')
      firstOption.click()
      fixture.detectChanges()

      const optionList = nativeElement.querySelector('.position-relative.row')
      expect(component.isOpened).toBeFalse()
      expect(optionList).toBeFalsy()
    }))
  })
})
