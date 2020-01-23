import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../../../event.service';
import { Subscription } from 'rxjs';
import { ExtendedEventModel } from '../../../../api/models/event.model';
import { QuickStatisticsResultModelImpl } from './../../models/quick-statistics-result.model';
import { EventTypes } from '../../../enums/event-types.enum';
import { EventTimeModel } from '../../models/event-time.model';

@Component({
  selector: 'app-quick-filtered-statistics',
  templateUrl: './quick-filtered-statistics.component.html',
  styleUrls: ['./quick-filtered-statistics.component.scss']
})
export class QuickFilteredStatisticsComponent implements OnInit, OnDestroy {

  filteredListSub: Subscription;

  results: QuickStatisticsResultModelImpl;
  eventTypeKeys: any[];
  anHour = 60;

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventTypeKeys = Object.keys(EventTypes);
    this.setResultsToDefault();
    this.initResults();
  }

  ngOnDestroy() {
    if (this.filteredListSub) {
      this.filteredListSub.unsubscribe();
    }
  }

  initResults() {
    this.filteredListSub = this.eventService._filteredEventList.subscribe((events: ExtendedEventModel[]) => {
      if (events) {
        this.calculateAllResults(events);
      }
    });
  }

  setResultsToDefault() {
    this.results = new QuickStatisticsResultModelImpl(
      {
        driveAndOtherAndPaidHolidaysResult: {hour: 0, minutes: 0},
        driveAndOtherResult: {hour: 0, minutes: 0},
        driveResult: {hour: 0, minutes: 0},
        otherResult: {hour: 0, minutes: 0},
        paidHolidayResult: {hour: 0, minutes: 0},
        paidLeaveResult: {hour: 0, minutes: 0},
        sickPayResult: {hour: 0, minutes: 0},
        standByResult: {hour: 0, minutes: 0}
      }
    );
  }

  calculateAllResults(events: ExtendedEventModel[]) {
    const driveResultTime: EventTimeModel = {hour: 0, minutes: 0};
    const otherResultTime: EventTimeModel = {hour: 0, minutes: 0};
    const paidHolidayResultTime: EventTimeModel = {hour: 0, minutes: 0};
    const paidLeaveResultTime: EventTimeModel = {hour: 0, minutes: 0};
    const sickPayResultTime: EventTimeModel = {hour: 0, minutes: 0};
    const standByResultTime: EventTimeModel = {hour: 0, minutes: 0};

    events.forEach((event: ExtendedEventModel) => {
      switch (event.eventType.key) {
        case this.eventTypeKeys[0]: {
          driveResultTime.minutes += (this.calcMinutesFromHour(event.timeHour) + event.timeMinutes);
          break;
        }
        case this.eventTypeKeys[1]: {
          standByResultTime.minutes += (this.calcMinutesFromHour(event.timeHour) + event.timeMinutes);
          break;
        }
        case this.eventTypeKeys[2]: {
          otherResultTime.minutes += (this.calcMinutesFromHour(event.timeHour) + event.timeMinutes) % this.anHour;
          break;
        }
        case this.eventTypeKeys[3]: {
          paidLeaveResultTime.minutes += (this.calcMinutesFromHour(event.timeHour) + event.timeMinutes) % this.anHour;
          break;
        }
        case this.eventTypeKeys[4]: {
          paidHolidayResultTime.minutes += (this.calcMinutesFromHour(event.timeHour) + event.timeMinutes) % this.anHour;
          break;
        }
        case this.eventTypeKeys[5]: {
          sickPayResultTime.minutes += (this.calcMinutesFromHour(event.timeHour) + event.timeMinutes) % this.anHour;
          break;
        }
      }
    });

    this.results.setDriveResult(
      this.calcEventTimeFromMin(driveResultTime.minutes)
    );
    this.results.setOtherResult(
      this.calcEventTimeFromMin(otherResultTime.minutes)
    );
    this.results.setPaidHolidayResult(
      this.calcEventTimeFromMin(paidHolidayResultTime.minutes)
    );
    this.results.setPaidLeaveResult(
      this.calcEventTimeFromMin(paidLeaveResultTime.minutes)
    );
    this.results.setSickPayResult(
      this.calcEventTimeFromMin(sickPayResultTime.minutes)
    );
    this.results.setStandByResult(
      this.calcEventTimeFromMin(standByResultTime.minutes)
    );
    this.results.setDriveAndOtherResult(
      this.calcMultiTime([
        driveResultTime.minutes,
        otherResultTime.minutes
      ])
    );
    this.results.setDriveAndOtherAndPaidHolidaysResult(
      this.calcMultiTime([
        driveResultTime.minutes,
        otherResultTime.minutes,
        paidHolidayResultTime.minutes
      ])
    );
  }

  calcEventTimeFromMin(minutes: number): EventTimeModel {
    const timeObj: EventTimeModel = {hour: 0, minutes: 0};

    if (minutes > 0) {
      timeObj.hour = Math.round(minutes / 60);
      timeObj.minutes = minutes % 60;
    }

    return timeObj;
  }

  calcMultiTime(minutesArr: number[]): EventTimeModel {
    let minResult = 0;
    let timeObj: EventTimeModel = {hour: 0, minutes: 0};

    for (const min of minutesArr) {
      minResult += min;
    }

    if (minResult > 0) {
      timeObj = this.calcEventTimeFromMin(minResult);
    }

    return timeObj;
  }

  calcMinutesFromHour(hour: number): number {
    return hour * 60;
  }
}
