import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import moment from 'moment';
import { EventTypes } from 'src/app/home/enums/event-types.enum';
import { WorkTimeRegex } from 'src/app/home/enums/work-time-regex.enum';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ResponseEventModel } from 'src/app/api/models/response/response-event.model';
import { EventModel } from '../../../models/event.model';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.scss']
})
export class CreateEditEventComponent implements OnInit {

  @Input() editableEvent: ResponseEventModel;
  @Output() formResult = new EventEmitter<EventModel>();

  createEventForm: FormGroup;
  eventTypes: EventTypes;
  eventTypeOptions: any[];
  currentDate: string;
  maxDate: NgbDateStruct;

  constructor(
    private formBuilder: FormBuilder,
    private ngbCalendar: NgbCalendar
  ) { }

  ngOnInit() {
    this.currentDate = moment().format(moment.HTML5_FMT.DATE);
    this.maxDate = this.ngbCalendar.getToday();
    this.eventTypeOptions = Object.assign(EventTypes);
    this.initForm();
  }

  initForm() {
    if (!this.editableEvent) {
      this.createEventForm = this.formBuilder.group({
        createdDateTime: [this.ngbCalendar.getToday(), Validators.required],
        time: ['', [
          Validators.required,
          Validators.pattern(new RegExp(WorkTimeRegex.FORMAT))]],
        eventType: [null, Validators.required]
      });
    }

    if (this.editableEvent) {
      const toNgbDate = moment(this.editableEvent.createDateTime);
      this.createEventForm = this.formBuilder.group({
        createdDateTime: new NgbDate(toNgbDate.year(), toNgbDate.month() + 1, toNgbDate.date()),
        time: [this.editableEvent.timeInMin, [
          Validators.required,
          Validators.pattern(new RegExp(WorkTimeRegex.FORMAT))]],
        eventType: [this.editableEvent.eventType, Validators.required]
      });
    }
  }

  submitNewEvent(newEvent: any) {
    if (newEvent) {
      this.formResult.emit(newEvent);
      this.createEventForm.reset();
    }
  }

}
