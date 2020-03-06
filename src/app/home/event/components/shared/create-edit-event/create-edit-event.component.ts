import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { EventTypes } from 'src/app/home/enums/event-types.enum';
import { ExtendedEventModel } from 'src/app/api/models/event.model';
import { ParseMinToHM } from 'src/app/home/utils/parse-min-to-hm';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.scss']
})
export class CreateEditEventComponent implements OnInit {

  @Input() editableEvent: ExtendedEventModel;
  @Output() formResult = new EventEmitter<ExtendedEventModel>();

  createEventForm: FormGroup;
  eventTypes: EventTypes;
  eventTypeOptions: any[];
  currentDate: string;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.currentDate = moment().format(moment.HTML5_FMT.DATE);
    this.eventTypeOptions = Object.assign(EventTypes);
    this.initForm();
  }

  initForm() {
    if (!this.editableEvent) {
      this.createEventForm = this.formBuilder.group({
        time: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
        eventType: [null, Validators.required]
      });
    }

    if (this.editableEvent) {
      this.createEventForm = this.formBuilder.group({
        time: [this.editableEvent.timeInMin, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
        eventType: [this.editableEvent.eventType.key, Validators.required]
      });
    }
  }

  submitNewEvent(newEvent: any) {
    if (newEvent) {
      const extendedEvent: ExtendedEventModel = {
        id: 6,
        uniqueSecondaryId: '#D000002',
        timeInMin: ParseMinToHM.parseHourMinToMinutesFormat(newEvent.time),
        eventType: {key: newEvent.eventType, value: this.eventTypeOptions[newEvent.eventType]},
        createDate: this.currentDate,
        createTime: moment().format(moment.HTML5_FMT.TIME)
      };
      this.formResult.emit(extendedEvent);
      this.createEventForm.reset();
    }
  }

}
