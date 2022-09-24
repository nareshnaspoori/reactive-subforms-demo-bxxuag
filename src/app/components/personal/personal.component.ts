import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class PersonalComponent implements OnInit, OnDestroy {
  parentForm!: FormGroup;
  genderOptions: string[];
  subscription: Subscription;
  data: { item_id: number; item_text: string }[];

  settings: any;

  constructor(
    private parent: FormGroupDirective,
    private fb: FormBuilder,
    dataService: DataService
  ) {
    this.subscription = new Subscription();
    this.genderOptions = dataService.getGenders();
  }

  ngOnInit(): void {
    this.parentForm = this.parent.form;
    this.parentForm.addControl(
      'personal',
      this.fb.group({
        first: ['', Validators.required],
        last: ['', Validators.required],
        gender: ['', Validators.required],
        genderOther: ['', Validators.required],
        cities: ['', Validators.required],
      })
    );

    this.subscription.add(
      this.parentForm
        .get('personal')
        ?.get('gender')
        ?.valueChanges.subscribe((value) => {
          const genderOther = this.parentForm
            .get('personal')
            ?.get('genderOther');
          if (value === 'Other') {
            genderOther?.setValidators(Validators.required);
          } else {
            genderOther?.clearValidators();
          }
          genderOther?.setValue('');
          genderOther?.markAsUntouched();
          genderOther?.updateValueAndValidity();
        })
    );

    this.data = [
      { item_id: 1, item_text: 'Hanoi' },
      { item_id: 2, item_text: 'Lang Son' },
      { item_id: 3, item_text: 'Vung Tau' },
      { item_id: 4, item_text: 'Hue' },
      { item_id: 5, item_text: 'Cu Chi' },
    ];
    // setting and support i18n
    this.settings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'Chọn All',
      unSelectAllText: 'Hủy chọn',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Tìm kiếm',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
  }
  public onItemSelect(item: any) {
    console.log(item);
  }
  public onDeSelect(item: any) {
    console.log(item);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
