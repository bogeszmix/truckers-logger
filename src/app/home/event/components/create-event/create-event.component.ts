import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { EventModel, ExtendedEventModel } from 'src/app/api/models/event.model';
import { EventService } from 'src/app/home/event.service';
import { DateFormat } from 'src/app/home/enums/date-format.enum';
import { EventTypes } from 'src/app/home/enums/event-types.enum';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  createEventForm: FormGroup;
  eventTypes: EventTypes;
  eventTypeOptions: any[];

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventTypeOptions = Object.assign(EventTypes);
    this.initForm();
  }

  initForm() {
    this.createEventForm = this.formBuilder.group({
      timeHour: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      timeMinutes: ['', [Validators.required, Validators.min(0), Validators.max(59)]],
      eventType: [null, Validators.required]
    });
  }

  submitNewEvent(newEvent: EventModel) {
    if (newEvent) {
      const extendedEvent: ExtendedEventModel = {
        id: 6,
        timeHour: newEvent.timeHour,
        timeMinutes: newEvent.timeMinutes,
        eventType: this.eventTypeOptions[newEvent.eventType],
        createDate: moment().format(DateFormat.HUN_DATE_FORMAT),
        createTime: moment().format(DateFormat.TIME_FORMAT_HOUR_MIN)
      };
      this.eventService.addNewEvent(extendedEvent);
      this.createEventForm.reset();
    }
  }



}
