import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import moment, { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { NgbDateTimeToMoment } from 'src/app/home/utils/ngb-date-time-to-moment';
import { dateTimeRegex } from 'src/app/home/utils/validators.regex';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
})
export class DateTimePickerComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  @Output() selectedDateTimeEvent = new EventEmitter<Moment>();

  startDate: NgbDateStruct;
  startTime: NgbTimeStruct;

  formattedSelectedDate: string;
  dateTimeFormat = 'YYYY-MM-DD HH:mm';

  dateTimeOuterPickerForm: FormGroup;
  dateTimeInnerPickerForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initDefaultDateTime();
    this.initDateTimePickerForms();
    this.onDatePickerPopoverClose();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  initDateTimePickerForms() {
    this.initOuterDateTimePickerForm();
    this.initInnerDateTimePickerForm();
  }

  initOuterDateTimePickerForm() {
    this.dateTimeOuterPickerForm = new FormGroup({
      createdDateTime: new FormControl(this.formattedSelectedDate, [
        Validators.required,
        Validators.pattern(dateTimeRegex),
      ]),
    });
  }

  initInnerDateTimePickerForm() {
    this.dateTimeInnerPickerForm = new FormGroup({
      datePicker: new FormControl(this.startDate, Validators.required),
      timePicker: new FormControl(this.startTime, Validators.required)
    });
  }

  initDefaultDateTime() {
    const todayMomentObject = moment();

    this.startDate = {
      year: todayMomentObject.year(),
      month: todayMomentObject.month() + 1,
      day: todayMomentObject.date(),
    };

    this.startTime = {
      hour: todayMomentObject.hour(),
      minute: todayMomentObject.minute(),
      second: todayMomentObject.second(),
    };

    this.formattedSelectedDate = todayMomentObject.format(this.dateTimeFormat);
  }

  listenOuterPickerForm() {
    this.subs.add(
      this.dateTimeOuterPickerForm.valueChanges.subscribe((dateTime: string) => {
        if (this.dateTimeOuterPickerForm.valid) {
          this.selectedDateTimeEvent.emit(NgbDateTimeToMoment.formatInputDateTimeStringToMoment(dateTime));
        }
      })
    );
  }

  onDatePickerPopoverClose() {
    if (this.dateTimeOuterPickerForm.valid) {

      const momentDateTime = NgbDateTimeToMoment.formatDateTimeStructToMoment(
        this._form.datePicker.value,
        this._form.timePicker.value
      );

      this.formattedSelectedDate = momentDateTime.format(this.dateTimeFormat);
      this.dateTimeOuterPickerForm.get('createdDateTime').setValue(this.formattedSelectedDate);

      this.selectedDateTimeEvent.emit(momentDateTime);
    }
  }

  get _form() {
    return this.dateTimeInnerPickerForm.controls;
  }
}
