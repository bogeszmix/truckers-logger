import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ExtendedEventModel } from 'src/app/api/models/event.model';
import { EventService } from 'src/app/home/event.service';

import { EventTypes } from '../../../enums/event-types.enum';
import { EventFilterModel } from '../../models/event-filter.model';
import { NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateNgBootstrapModel } from '../../models/date-ngbootstrap.model';
import { NgbDateToMoment } from '../../../utils/ngb-date-to-moment';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  eventListSub: Subscription;
  filterFormSub: Subscription;

  filterForm: FormGroup;

  eventList: ExtendedEventModel[];
  filterableEventList: ExtendedEventModel[] = [];
  eventTypesObject: any;
  eventTypes: EventTypes;
  eventTypeOptions: any[];

  disabled: boolean;
  maxDate: NgbDateStruct;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private ngbCalendar: NgbCalendar
  ) { }

  ngOnInit() {
    this.eventTypeOptions = Object.assign(EventTypes);
    this.initFilterForm();
    this.disabled = false;
    this.maxDate = this.ngbCalendar.getToday();
    this.initEventList();
    this.checkFilterForm();
  }

  ngOnDestroy() {
    if (this.eventListSub) {
      this.eventListSub.unsubscribe();
    }

    if (this.filterFormSub) {
      this.filterFormSub.unsubscribe();
    }
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


  checkFilterForm() {
    this.filterFormSub = this.filterForm.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe((form: EventFilterModel) => {
      const dateFrom = form.dateFrom;
      const dateTo = form.dateTo;
      this.dateCompareCheck(dateFrom, dateTo);
      this.filterableEventList = [...this.eventList];
    });
  }


  dateCompareCheck(dateFrom: DateNgBootstrapModel, dateTo: DateNgBootstrapModel) {
    const momentDateFrom = NgbDateToMoment.convertNgbDateToMoment(dateFrom);
    const momentDateTo = NgbDateToMoment.convertNgbDateToMoment(dateTo);

    if (momentDateFrom.isSameOrBefore(momentDateTo)) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }

  }


  resetFilter() {
    this.filterForm.reset();
    this.filterableEventList = [...this.eventList];
  }

  submitFilterForm(filterData: EventFilterModel) {
    const temp = [...this.filterableEventList];

    if (filterData.eventType && filterData.dateFrom && filterData.dateTo) {
      const dateFrom = NgbDateToMoment.convertNgbDateToMoment(filterData.dateFrom);
      const dateTo = NgbDateToMoment.convertNgbDateToMoment(filterData.dateTo);

      this.filterableEventList = temp.filter((event: ExtendedEventModel) =>
        event.eventType.key === filterData.eventType &&
        moment(event.createDate).isSameOrAfter(dateFrom) &&
        moment(event.createDate).isSameOrBefore(dateTo)
      );
    }

    if (!filterData.eventType && filterData.dateFrom && filterData.dateTo) {
      const dateFrom = NgbDateToMoment.convertNgbDateToMoment(filterData.dateFrom);
      const dateTo = NgbDateToMoment.convertNgbDateToMoment(filterData.dateTo);

      this.filterableEventList = temp.filter((event: ExtendedEventModel) =>
        moment(event.createDate).isSameOrAfter(dateFrom) && moment(event.createDate).isSameOrBefore(dateTo));
    }

    if (filterData.eventType && !filterData.dateFrom && !filterData.dateTo) {
      this.filterableEventList = temp.filter(
        (event: ExtendedEventModel) => event.eventType.key === filterData.eventType
      );
    }
  }
}
