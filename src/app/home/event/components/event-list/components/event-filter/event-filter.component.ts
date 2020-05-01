import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { EventTypes } from 'src/app/home/enums/event-types.enum';
import { DateNgBootstrapModel } from 'src/app/home/event/models/date-ngbootstrap.model';
import { NgbDateToMoment } from 'src/app/home/utils/ngb-date-to-moment';
import { EventFilterModel } from 'src/app/home/event/models/event-filter.model';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss']
})
export class EventFilterComponent implements OnInit, OnDestroy {

  @Output() submittedFilter = new EventEmitter<
    { eventType?: string; dateFrom?: string; dateTo?: string; }
  >();

  subs: Subscription;

  filterForm: FormGroup;
  eventTypeOptions: any[];
  disabled: boolean;
  maxDate: NgbDateStruct;

  constructor(
    private formBuilder: FormBuilder,
    private ngbCalendar: NgbCalendar
  ) { }

  ngOnInit() {
    this.subs = new Subscription();
    this.initFilterForm();
    this.eventTypeOptions = Object.assign(EventTypes);
    this.disabled = false;
    this.maxDate = this.ngbCalendar.getToday();
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

  checkFilterForm() {
    this.subs.add(this.filterForm.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe((form: EventFilterModel) => {
        const dateFrom = form.dateFrom;
        const dateTo = form.dateTo;
        this.dateCompareCheck(dateFrom, dateTo);
      }));
  }

  resetFilter() {
    this.filterForm.reset();
    this.submittedFilter.emit({
      eventType: null,
      dateFrom: moment().add(-1, 'month').format(moment.HTML5_FMT.DATE),
      dateTo: moment().format(moment.HTML5_FMT.DATE)
    });
  }

  getFinalFilterObject(filterData: EventFilterModel) {
    const resultFilter = {
      eventType: null,
      dateFrom: null,
      dateTo: null
    };

    if (!filterData) {
      resultFilter.dateFrom = moment().add(-1, 'month');
      resultFilter.dateTo = moment();
      return resultFilter;
    }

    if (filterData.eventType && filterData.dateFrom && filterData.dateTo) {
      const dateFrom = NgbDateToMoment.convertNgbDateToMoment(filterData.dateFrom);
      const dateTo = NgbDateToMoment.convertNgbDateToMoment(filterData.dateTo);

      resultFilter.eventType = filterData.eventType;
      resultFilter.dateFrom = moment(dateFrom).isSameOrBefore(dateTo) ? dateFrom : moment();
      resultFilter.dateTo = moment(dateFrom).isSameOrBefore(dateTo) ? dateTo : moment();

    }

    if (!filterData.eventType && filterData.dateFrom && filterData.dateTo) {
      const dateFrom = NgbDateToMoment.convertNgbDateToMoment(filterData.dateFrom);
      const dateTo = NgbDateToMoment.convertNgbDateToMoment(filterData.dateTo);

      resultFilter.dateFrom = moment(dateFrom).isSameOrBefore(dateTo) ? dateFrom : moment();
      resultFilter.dateTo = moment(dateFrom).isSameOrBefore(dateTo) ? dateTo : moment();
    }

    if (filterData.eventType && !filterData.dateFrom && !filterData.dateTo) {
      resultFilter.eventType = filterData.eventType;
      resultFilter.dateFrom = moment().add(-1, 'month');
      resultFilter.dateTo = moment();
    }

    if (!filterData.eventType && !filterData.dateFrom && !filterData.dateTo) {
      resultFilter.dateFrom = moment().add(-1, 'month');
      resultFilter.dateTo = moment();
    }

    return resultFilter;
  }

  submitFilterForm(filterData: EventFilterModel) {
    const filter = this.getFinalFilterObject(filterData);
    this.submittedFilter.emit(filter);
  }

}
