import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { EventTypes } from 'src/app/home/enums/event-types.enum';
import { ExtendedEventModel } from '../../../models/event.model';
import { WorkTimeRegex } from 'src/app/home/enums/work-time-regex.enum';

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
        time: ['', [
          Validators.required,
          Validators.pattern(new RegExp(WorkTimeRegex.FORMAT))]],
        eventType: [null, Validators.required]
      });
    }

    if (this.editableEvent) {
      this.createEventForm = this.formBuilder.group({
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
