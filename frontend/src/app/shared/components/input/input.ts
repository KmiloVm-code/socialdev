import { Component, EventEmitter, Input as NgInput, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Input,
      multi: true
    }
  ]
})
export class Input implements ControlValueAccessor {
  @NgInput() type: string = 'text';
  @NgInput() id: string = '';
  @NgInput() name: string = '';
  @NgInput() required: boolean = false;
  @NgInput() placeholder: string = '';
  @NgInput() customClass: string = '';
  @NgInput() disabled: boolean = false;
  @NgInput() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onChange: any = () => {};
  onTouched: any = () => {};

  get inputClasses(): string {
    return this.customClass ? `inputClass ${this.customClass}` : 'inputClass';
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
