import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { ExtendedEventModel } from 'src/app/api/models/event.model';
import { DateFormat } from './enums/date-format.enum';
import { EventTypes as Event } from './enums/event-types.enum';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private mockEventListArray: ExtendedEventModel[] = [
    {
      id: 1,
      timeHour: 15,
      timeMinutes: 25,
      eventType: Event.EVENT1,
      createDate: moment().format(DateFormat.HUN_DATE_FORMAT),
      createTime: moment().format(DateFormat.TIME_FORMAT_HOUR_MIN)
    },
    {
      id: 2,
      timeHour: 23,
      timeMinutes: 0,
      eventType: Event.EVENT2,
      createDate: moment().format(DateFormat.HUN_DATE_FORMAT),
      createTime: moment().format(DateFormat.TIME_FORMAT_HOUR_MIN)
    },
    {
      id: 3,
      timeHour: 10,
      timeMinutes: 56,
      eventType: Event.EVENT1,
      createDate: moment().format(DateFormat.HUN_DATE_FORMAT),
      createTime: moment().format(DateFormat.TIME_FORMAT_HOUR_MIN)
    },
    {
      id: 4,
      timeHour: 6,
      timeMinutes: 9,
      eventType: Event.EVENT4,
      createDate: moment().format(DateFormat.HUN_DATE_FORMAT),
      createTime: moment().format(DateFormat.TIME_FORMAT_HOUR_MIN)
    },
    {
      id: 5,
      timeHour: 11,
      timeMinutes: 33,
      eventType: Event.EVENT3,
      createDate: moment().format(DateFormat.HUN_DATE_FORMAT),
      createTime: moment().format(DateFormat.TIME_FORMAT_HOUR_MIN)
    }
  ];

  private eventList = new BehaviorSubject<ExtendedEventModel[]>(this.mockEventListArray);

  constructor() { }

  get _eventList() {
    if (this.eventList) {
      return this.eventList.asObservable();
    }
  }

  addNewEvent(newEvent: ExtendedEventModel) {
    if (newEvent) {
      const tempEventListArray = [...this.mockEventListArray];
      tempEventListArray.push(newEvent);
      this.eventList.next(tempEventListArray);
    }
  }
}
