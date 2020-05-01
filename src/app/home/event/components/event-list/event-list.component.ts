import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { EventService } from 'src/app/home/event/event.service';
import { ParseMinToHM } from '../../../utils/parse-min-to-hm';
import { ResponseEventModel } from 'src/app/api/models/response/response-event.model';
import { OrderOptionModel } from 'src/app/home/shared/models/order-option.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  subs: Subscription;
  eventList: any[];
  filterableEventList: any[] = [];
  orderList: OrderOptionModel[];
  page = 1;
  pageSize = 10;
  dateOrder: string;
  dateTo: string;
  dateFrom: string;
  isLoading = false;

  constructor(
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.defaultDateFilterRange();
    this.subs = new Subscription();
    this.initOrderOptionList();
    this.initEventList();
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  initOrderOptionList() {
    this.orderList = [
      {
        value: 'DESC',
        translateKey: 'EVENTS.LIST_EVENT.ORDER_OPTIONS.DESC',
        default: true
      },
      {
        value: 'ASC',
        translateKey: 'EVENTS.LIST_EVENT.ORDER_OPTIONS.ASC'
      }
    ];
  }

  defaultDateFilterRange() {
    this.dateFrom = moment().add(-1, 'month').format(moment.HTML5_FMT.DATE);
    this.dateTo = moment().format(moment.HTML5_FMT.DATE);
  }

  initEventList() {
    this.isLoading = true;
    this.subs.add(this.eventService.initEventList(
      {dateTo: this.dateTo, dateFrom: this.dateFrom}
    ).subscribe(() => this.isLoading = false));
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
                createDateTime: eventItem.createDateTime,
                userId: eventItem.userId
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



  submitFilterEvent(filterData: { eventType: string; dateFrom: string; dateTo: string; }) {
    this.dateFrom = moment(filterData.dateFrom).format(moment.HTML5_FMT.DATE);
    this.dateTo = moment(filterData.dateTo).format(moment.HTML5_FMT.DATE);

    this.subs.add(this.eventService.initEventList(filterData)
      .subscribe((filteredEvents: ResponseEventModel[]) => {
        this.eventService.filterEvents(filteredEvents);
    }));
  }



  selectedOrder(selectedObj: string) {
    this.dateOrder = selectedObj;
  }
}
