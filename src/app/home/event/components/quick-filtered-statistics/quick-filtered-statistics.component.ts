import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../../event.service';
import { Subscription } from 'rxjs';
import { EventTypes } from '../../../enums/event-types.enum';
import { ParseMinToHM } from '../../../utils/parse-min-to-hm';
import { ExtendedEventModel } from '../../models/event.model';
import { RequestEventModel } from 'src/app/api/models/request/request-event.model';

@Component({
  selector: 'app-quick-filtered-statistics',
  templateUrl: './quick-filtered-statistics.component.html',
  styleUrls: ['./quick-filtered-statistics.component.scss']
})
export class QuickFilteredStatisticsComponent implements OnInit, OnDestroy {

  filteredListSub: Subscription;

  driveAndOtherAndPaidHolidaysResult: string;
  driveAndOtherResult: string;
  driveResult: string;
  otherResult: string;
  paidHolidayResult: string;
  paidLeaveResult: string;
  sickPayResult: string;
  standByResult: string;

  eventTypeKeys: any[];

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
    this.filteredListSub = this.eventService._filteredEventList.subscribe((events: RequestEventModel[]) => {
      if (events) {
        this.calculateAllResults(events);
      }
    });
  }

  setResultsToDefault() {
    this.driveAndOtherAndPaidHolidaysResult = '';
    this.driveAndOtherResult = '';
    this.driveResult = '';
    this.otherResult = '';
    this.paidHolidayResult = '';
    this.paidLeaveResult = '';
    this.sickPayResult = '';
    this.standByResult = '';
  }

  calculateAllResults(events: RequestEventModel[]) {

    let driveResult = 0;
    let otherResult = 0;
    let paidHolidayResult = 0;
    let paidLeaveResult = 0;
    let sickPayResult = 0;
    let standByResult = 0;



    events.forEach((event: any) => {
      switch (event.eventType) {
        case this.eventTypeKeys[0]: {
          driveResult += event.timeInMin;
          break;
        }
        case this.eventTypeKeys[1]: {
          standByResult += event.timeInMin;
          break;
        }
        case this.eventTypeKeys[2]: {
          otherResult += event.timeInMin;
          break;
        }
        case this.eventTypeKeys[3]: {
          paidLeaveResult += event.timeInMin;
          break;
        }
        case this.eventTypeKeys[4]: {
          paidHolidayResult += event.timeInMin;
          break;
        }
        case this.eventTypeKeys[5]: {
          sickPayResult += event.timeInMin;
          break;
        }
      }
    });

    this.driveAndOtherAndPaidHolidaysResult = ParseMinToHM.parseMinutesToHourMinFormat(
      (driveResult + otherResult + paidLeaveResult)
    );

    this.driveAndOtherResult = ParseMinToHM.parseMinutesToHourMinFormat(
      (driveResult + otherResult)
    );

    this.driveResult = ParseMinToHM.parseMinutesToHourMinFormat(driveResult);
    this.otherResult = ParseMinToHM.parseMinutesToHourMinFormat(otherResult);
    this.paidHolidayResult = ParseMinToHM.parseMinutesToHourMinFormat(paidHolidayResult);
    this.paidLeaveResult = ParseMinToHM.parseMinutesToHourMinFormat(paidLeaveResult);
    this.sickPayResult = ParseMinToHM.parseMinutesToHourMinFormat(sickPayResult);
    this.standByResult = ParseMinToHM.parseMinutesToHourMinFormat(standByResult);
  }
}
