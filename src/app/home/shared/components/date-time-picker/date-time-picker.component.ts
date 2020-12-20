import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Moment } from 'moment';
import { NgbDateTimeToMoment } from 'src/app/home/utils/ngb-date-time-to-moment';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {
  selectedDate: NgbDateStruct;
  selectedTime: NgbTimeStruct;

  formattedSelectedDate: string;

  @Output() selectedDateTimeEvent = new EventEmitter<Moment>();

  dateTimePickerForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initDateTimePickerForm();
  }

  initDateTimePickerForm() {
    this.dateTimePickerForm = new FormGroup({
      createdDateTime: new FormControl('', Validators.required)
    });
  }

  onDateChange(date: NgbDateStruct) {
    this.selectedDate = date;
    // TODO Impl date changes, and date appearing in input and validate hand written value
  }

  onTimeChange(time: NgbTimeStruct) {
    this.selectedTime = time;
  }

  onDatePickerPopoverClose() {
    this.selectedDateTimeEvent.emit(
      NgbDateTimeToMoment.formatDateTimeStructToMoment(
        this.selectedDate,
        this.selectedTime
      )
    );
  }

}
