import { Component, EventEmitter, Input as NgInput, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
})
export class Input {
  @NgInput() type: string = 'text';
  @NgInput() id: string = '';
  @NgInput() name: string = '';
  @NgInput() required: boolean = false;
  @NgInput() placeholder: string = '';
  @NgInput() value: string = '';
  @NgInput() inputClass: string = 'inputClass';
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
