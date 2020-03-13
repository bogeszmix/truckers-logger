import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EventService } from 'src/app/home/event/event.service';
import { RequestEventModel } from 'src/app/api/models/request/request-event.model';
import { ParseMinToHM } from 'src/app/home/utils/parse-min-to-hm';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {}

  submitNewEvent(event: any) {
    if (event) {
      const newEvent: RequestEventModel = {
        uniqueSecondaryId: moment().format('x').toString(),
        timeInMin: ParseMinToHM.parseHourMinToMinutesFormat(event.time),
        eventType: event.eventType,
        createDate: moment().format(moment.HTML5_FMT.DATE),
        createTime: moment().format(moment.HTML5_FMT.TIME),
        userId: 'AASdaasdeare3332432x'
      };
      this.eventService.addNewEvent(newEvent)
        .then(() => console.log('Successful'))
        .catch(response => console.log(response));
    }
  }



}
