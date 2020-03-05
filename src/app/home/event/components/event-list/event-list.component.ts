import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ExtendedEventModel } from 'src/app/api/models/event.model';
import { EventService } from 'src/app/home/event/event.service';

import { EventTypes } from '../../../enums/event-types.enum';
import { EventFilterModel } from '../../models/event-filter.model';
import {
  NgbDate,
  NgbDateStruct,
  NgbCalendar
} from '@ng-bootstrap/ng-bootstrap';
import { DateNgBootstrapModel } from '../../models/date-ngbootstrap.model';
import { NgbDateToMoment } from '../../../utils/ngb-date-to-moment';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { ParseMinToHM } from '../../../utils/parse-min-to-hm';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
  filteredEventEmitter = new EventEmitter<ExtendedEventModel[]>();

  subs: Subscription;

  filterForm: FormGroup;

  eventList: ExtendedEventModel[];
  filterableEventList: ExtendedEventModel[] = [];
  eventTypesObject: any;
  eventTypes: EventTypes;
  eventTypeOptions: any[];
  page = 1;
  pageSize = 10;

  disabled: boolean;
  maxDate: NgbDateStruct;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private ngbCalendar: NgbCalendar
  ) {}

  ngOnInit() {
    this.subs = new Subscription();
    this.eventTypeOptions = Object.assign(EventTypes);
    this.initFilterForm();
    this.disabled = false;
    this.maxDate = this.ngbCalendar.getToday();
    this.initEventList();
    this.checkFilterForm();
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
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
    this.subs.add(this.eventService._eventList
      .pipe(
        map((eventsList: ExtendedEventModel[]) => {
          const convertedViewList = [];
          if (eventsList) {
            eventsList.forEach((eventItem: ExtendedEventModel) => {
                const newConvertedItem = {
                  uniqueSecondaryId: eventItem.uniqueSecondaryId,
                  timeInMin: ParseMinToHM.parseMinutesToHourMinFormat(eventItem.timeInMin),
                  eventType: {key: eventItem.eventType.key, value: eventItem.eventType.value},
                  createDate: eventItem.createDate,
                  createTime: eventItem.createTime
                };
                convertedViewList.push(newConvertedItem);
            });
          }

          return convertedViewList;
        })
      )
      .subscribe((list: any[]) => {
        if (list) {
          this.eventList = list;
          this.filterableEventList = [...this.eventList];
        }
      }));
  }

  checkFilterForm() {
    this.subs.add(this.filterForm.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe((form: EventFilterModel) => {
        const dateFrom = form.dateFrom;
        const dateTo = form.dateTo;
        this.dateCompareCheck(dateFrom, dateTo);
        this.filterableEventList = [...this.eventList];
      }));
  }

  dateCompareCheck(
    dateFrom: DateNgBootstrapModel,
    dateTo: DateNgBootstrapModel
  ) {
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
      const dateFrom = NgbDateToMoment.convertNgbDateToMoment(
        filterData.dateFrom
      );
      const dateTo = NgbDateToMoment.convertNgbDateToMoment(filterData.dateTo);

      this.filterableEventList = temp.filter(
        (event: ExtendedEventModel) =>
          event.eventType.key === filterData.eventType &&
          moment(event.createDate).isSameOrAfter(dateFrom) &&
          moment(event.createDate).isSameOrBefore(dateTo)
      );
    }

    if (!filterData.eventType && filterData.dateFrom && filterData.dateTo) {
      const dateFrom = NgbDateToMoment.convertNgbDateToMoment(
        filterData.dateFrom
      );
      const dateTo = NgbDateToMoment.convertNgbDateToMoment(filterData.dateTo);

      this.filterableEventList = temp.filter(
        (event: ExtendedEventModel) =>
          moment(event.createDate).isSameOrAfter(dateFrom) &&
          moment(event.createDate).isSameOrBefore(dateTo)
      );
    }

    if (filterData.eventType && !filterData.dateFrom && !filterData.dateTo) {
      this.filterableEventList = temp.filter(
        (event: ExtendedEventModel) =>
          event.eventType.key === filterData.eventType
      );
    }

    this.eventService.updateFilteredEventList(this.filterableEventList);
  }
}
