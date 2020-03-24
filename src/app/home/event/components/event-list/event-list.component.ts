import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/home/event/event.service';

import { EventTypes } from '../../../enums/event-types.enum';
import { EventFilterModel } from '../../models/event-filter.model';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { DateNgBootstrapModel } from '../../models/date-ngbootstrap.model';
import { NgbDateToMoment } from '../../../utils/ngb-date-to-moment';
import { ParseMinToHM } from '../../../utils/parse-min-to-hm';
import { EditEventComponent } from '../modals/edit-event/edit-event.component';
import { DeleteEventComponent } from '../modals/delete-event/delete-event.component';
import { ResponseEventModel } from 'src/app/api/models/response/response-event.model';
import { ToastService } from 'src/app/home/shared/toast/toast.service';
import { TranslationService } from 'src/app/translation/translation.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  subs: Subscription;

  filterForm: FormGroup;

  eventList: any[];
  filterableEventList: any[] = [];
  eventTypesObject: any;
  eventTypes: EventTypes;
  eventTypeOptions: any[];
  page = 1;
  pageSize = 10;

  disabled: boolean;
  maxDate: NgbDateStruct;

  clickedRowObject: any;

  isLoading = false;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private translationService: TranslationService,
    private ngbCalendar: NgbCalendar,
    private toastService: ToastService,
    private modalService: NgbModal
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
    this.isLoading = true;
    this.subs.add(this.eventService.initEventList().subscribe(() => this.isLoading = false));
    this.subs.add(this.eventService._eventList
      .pipe(
        map((eventsList: ResponseEventModel[]) => {
          if (eventsList) {
            return eventsList.map((eventItem: ResponseEventModel) =>
              Object.prototype.constructor({
                id: eventItem.id,
                uniqueSecondaryId: eventItem.uniqueSecondaryId,
                timeInMin: ParseMinToHM.parseMinutesToHourMinFormat(eventItem.timeInMin),
                eventType: eventItem.eventType,
                createDate: eventItem.createDate,
                createTime: eventItem.createTime
              })
            );
          }
        })
      ).subscribe((list: any[]) => {
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

    const resultFilter = {
      eventType: null,
      dateFrom: null,
      dateTo: null
    };

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
      resultFilter.dateFrom = moment().add(-1, 'day');
      resultFilter.dateTo = moment();
    }

    if (!filterData.eventType && !filterData.dateFrom && !filterData.dateTo) {
      resultFilter.dateFrom = moment().add(-1, 'day');
      resultFilter.dateTo = moment();
    }

    this.subs.add(this.eventService.initEventList(resultFilter)
      .subscribe((filteredEvents: ResponseEventModel[]) => {
        this.eventService.filterEvents(filteredEvents);
    }));
  }

  clickedRow(eventObject: any) {
    if (eventObject) {
      this.clickedRowObject = eventObject;
    }
  }

  editEvent() {
    if (this.clickedRowObject) {
      const editModalRef = this.modalService.open(EditEventComponent);
      editModalRef.componentInstance.eventItemObject = this.clickedRowObject;

      editModalRef.result.then((editedItem: ResponseEventModel) => {
        if (editedItem) {
          this.eventService.modifyEvent(editedItem)
          .then(() => this.toastService.showSuccess(
            this.translationService.getInstant('EVENTS.TOAST.EDITED_SUCCESSFUL')
          ))
          .catch(response => this.toastService.showAlert(
            this.translationService.getInstant('EVENTS.TOAST.SOMETHING_WENT_WRONG')
          ));
        }
      });
    }
  }

  deleteEvent() {
    if (this.clickedRowObject) {
      const deleteModalRef = this.modalService.open(DeleteEventComponent);
      deleteModalRef.componentInstance.deletableEvent = this.clickedRowObject;

      deleteModalRef.result.then((deletedItem: ResponseEventModel) => {
        if (deletedItem) {
          this.eventService.deleteEvent(deletedItem)
          .then(() => this.toastService.showSuccess(
            this.translationService.getInstant('EVENTS.TOAST.DELETED_SUCCESSFUL')
          ))
          .catch(response => this.toastService.showAlert(
            this.translationService.getInstant('EVENTS.TOAST.SOMETHING_WENT_WRONG')
          ));
        }
      });
    }
  }
}
