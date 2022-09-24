import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequiredFieldComponent } from './required-field/required-field.component';
import { RequiredSelectComponent } from './required-select/required-select.component';
import { RequiredMultiSelectComponent } from './required-multi-select/required-multi-select.component';

@NgModule({
  declarations: [RequiredFieldComponent, RequiredSelectComponent,RequiredMultiSelectComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RequiredFieldComponent,
    RequiredSelectComponent,
    RequiredMultiSelectComponent
  ],
})
export class SharedModule {}
