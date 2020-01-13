import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ExtendedEventModel } from 'src/app/api/models/event.model';
import { DateFormat } from 'src/app/home/enums/date-format.enum';
import { EventService } from 'src/app/home/event.service';

import { EventTypes } from '../../../enums/event-types.enum';
import { EventFilterModel } from '../../models/event-filter.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  eventListSub: Subscription;

  filterForm: FormGroup;

  eventList: ExtendedEventModel[];
  filterableEventList: ExtendedEventModel[] = [];
  eventTypesObject: any;
  eventTypes: EventTypes;
  eventTypeOptions: any[];
  filterEventsByValue: EventFilterModel;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.eventTypeOptions = Object.assign(EventTypes);
    this.eventTypesObject = Object.assign(EventTypes);
    this.filterEventsByValue = {};
    this.initFilterForm();
    this.initEventList();
  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      eventType: [null],
      dateFrom: [''],
      dateTo: ['']
    });
  }

  initEventList() {
    this.eventListSub = this.eventService._eventList.subscribe((eventList: ExtendedEventModel[]) => {
      if (eventList) {
        this.eventList = eventList;
        this.filterableEventList = [...this.eventList];
      }
    });
  }

  ngOnDestroy() {
    if (this.eventListSub) {
      this.eventListSub.unsubscribe();
    }
  }

  resetFilter() {
    this.filterForm.reset();
    this.filterEventsByValue = {};
  }

  submitFilterForm(filterData: EventFilterModel) {
    const realFilterDatas = {} as EventFilterModel;

    if (filterData.eventType) {
      realFilterDatas.eventType = this.eventTypeOptions[filterData.eventType];
    }

    if (filterData.dateFrom) {
      realFilterDatas.dateFrom = moment(filterData.dateFrom).format(DateFormat.HUN_DATE_FORMAT);
    }

    if (filterData.dateTo) {
      realFilterDatas.dateTo = moment(filterData.dateTo).format(DateFormat.HUN_DATE_FORMAT);
    }
    console.log(realFilterDatas);
    this.filterEventsByValue = realFilterDatas;
  }
}
