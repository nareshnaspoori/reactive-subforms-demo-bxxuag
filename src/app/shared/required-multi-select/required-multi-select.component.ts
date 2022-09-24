import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-required-multi-select',
  templateUrl: './required-multi-select.component.html',
  styleUrls: ['./required-multi-select.component.css'],
})
export class RequiredMultiSelectComponent
  implements OnInit, ControlValueAccessor
{
  @ViewChild('multiSelect') multiSelect;
  @Input() options!: string[];
  @Input() data:any;
  @Input() settings:any;
  @Input() placeholder: string = '';
  @Input() disabled!:boolean
  @Input() validationMsg: string = '';
  @Output() blur: EventEmitter<void> = new EventEmitter<void>();
  //disabled!: boolean;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    let validators = control?.validator
      ? [control.validator, Validators.required]
      : Validators.required;
    control?.setValidators(validators);
  }
  writeValue(value: any): void {
    value && this.controlDir.control?.setValue(value, { emitEvent: false });
  }

  registerOnChange(onChange: (value: any) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  // setDisabledState(disabled: boolean): void {
  //   this.disabled = disabled;
  // }

  public onFilterChange(item: any) {
    console.log(item);
  }
  public onDropDownClose(item: any) {
    console.log(item);
  }

  public onItemSelect(item: any) {
    console.log(item);
  }
  public onDeSelect(item: any) {
    console.log(item);
  }

  public onSelectAll(items: any) {
    console.log(items);
  }
  public onDeSelectAll(items: any) {
    console.log(items);
  }
}
