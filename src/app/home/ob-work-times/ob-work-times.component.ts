import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ob-work-times',
  templateUrl: './ob-work-times.component.html',
  styleUrls: ['./ob-work-times.component.scss']
})
export class ObWorkTimesComponent implements OnInit {

  yearPickerForm: FormGroup;
  yearList: number[];

  workTimesList: any[] = [1];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.yearList = [2020, 2019];
    this.initYearPickerForm();
  }

  initYearPickerForm() {
    this.yearPickerForm = this.formBuilder.group({
      year: [null]
    });
  }

}
