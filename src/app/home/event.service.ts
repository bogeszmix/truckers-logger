import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { ExtendedEventModel } from 'src/app/api/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private mockEventListArray: ExtendedEventModel[] = [
    {
      id: 1,
      timeHour: 15,
      timeMinutes: 25,
      eventType: {key: 'EVENT1', value: 'Vezetés'},
      createDate: moment().format(moment.HTML5_FMT.DATE),
      createTime: moment().format(moment.HTML5_FMT.TIME)
    },
    {
      id: 2,
      timeHour: 23,
      timeMinutes: 0,
      eventType: {key: 'EVENT2', value: 'Készenlét'},
      createDate: moment().format(moment.HTML5_FMT.DATE),
      createTime: moment().format(moment.HTML5_FMT.TIME)
    },
    {
      id: 3,
      timeHour: 10,
      timeMinutes: 56,
      eventType: {key: 'EVENT1', value: 'Vezetés'},
      createDate: moment().format(moment.HTML5_FMT.DATE),
      createTime: moment().format(moment.HTML5_FMT.TIME)
    },
    {
      id: 4,
      timeHour: 6,
      timeMinutes: 9,
      eventType: {key: 'EVENT4', value: 'Fizetett szabadság'},
      createDate: moment().format(moment.HTML5_FMT.DATE),
      createTime: moment().format(moment.HTML5_FMT.TIME)
    },
    {
      id: 5,
      timeHour: 11,
      timeMinutes: 33,
      eventType: {key: 'EVENT3', value: 'Egyéb munka'},
      createDate: moment().format(moment.HTML5_FMT.DATE),
      createTime: moment().format(moment.HTML5_FMT.TIME)
    }
  ];

  private eventList = new BehaviorSubject<ExtendedEventModel[]>(this.mockEventListArray);
  private filteredEventList = new BehaviorSubject<ExtendedEventModel[]>(undefined);

  constructor() { }

  get _eventList() {
    if (this.eventList) {
      return this.eventList.asObservable();
    }
  }

  get _filteredEventList() {
    if (this.filteredEventList) {
      return this.filteredEventList.asObservable();
    }
  }

  addNewEvent(newEvent: ExtendedEventModel) {
    if (newEvent) {
      this.mockEventListArray.push(newEvent);
      this.eventList.next(this.mockEventListArray);
    }
  }

  updateFilteredEventList(events: ExtendedEventModel[]) {
    if (events) {
      this.filteredEventList.next(events);
    }
  }
}
