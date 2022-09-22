import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-check-three',
  templateUrl: './check-three.component.html',
  styleUrls: ['./check-three.component.scss'],
  providers: [{ 
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckThreeComponent),
    multi: true
  }]
})
export class CheckThreeComponent implements ControlValueAccessor {

  im = "";
  @Input()
  text:string ="";

  _value:boolean | null = null;

  get value () {
    return this._value
  }
  @Input()
  set value(val) {
    this._value = val;
    this.onChange(this._value);
  }

  onChange(_: any) {}

  constructor() { }
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void {

  }

  valCh() {
    if (this.value == null) {
      this.value = true;
      this.im = '../../../../../assets/plusIcon.png';
    }
    else if (this.value == true) {
      this.value = false;
      this.im = '../../../../../assets/minusIcon.png';
    }
    else {
      this.value = null;
      this.im = "";
    }
  }
}
