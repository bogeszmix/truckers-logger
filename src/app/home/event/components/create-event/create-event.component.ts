import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { EventModel, ExtendedEventModel } from 'src/app/api/models/event.model';
import { EventTypes } from 'src/app/home/enums/event-types.enum';
import { EventService } from 'src/app/home/event/event.service';
import { ParseMinToHM } from '../../../utils/parse-min-to-hm';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  createEventForm: FormGroup;
  eventTypes: EventTypes;
  eventTypeOptions: any[];
  currentDate: string;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.currentDate = moment().format(moment.HTML5_FMT.DATE);
    this.eventTypeOptions = Object.assign(EventTypes);
    this.initForm();
  }

  initForm() {
    this.createEventForm = this.formBuilder.group({
      time: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      eventType: [null, Validators.required]
    });
  }

  submitNewEvent(newEvent: any) {
    if (newEvent) {
      const extendedEvent: ExtendedEventModel = {
        id: 6,
        timeInMin: ParseMinToHM.parseHourMinToMinutesFormat(newEvent.time),
        eventType: {key: newEvent.eventType, value: this.eventTypeOptions[newEvent.eventType]},
        createDate: this.currentDate,
        createTime: moment().format(moment.HTML5_FMT.TIME)
      };
      this.eventService.addNewEvent(extendedEvent);
      this.createEventForm.reset();
    }
  }



}
