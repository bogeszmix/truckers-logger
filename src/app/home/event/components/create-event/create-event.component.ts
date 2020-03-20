import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EventService } from 'src/app/home/event/event.service';
import { RequestEventModel } from 'src/app/api/models/request/request-event.model';
import { ParseMinToHM } from 'src/app/home/utils/parse-min-to-hm';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastService } from 'src/app/home/shared/toast/toast.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private toastService: ToastService
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
        userId: this.authService.getCurrentLoggedInUser().uid
      };
      this.eventService.addNewEvent(newEvent)
        .then(() => this.toastService.showSuccess('Sikeresen létrehozva'))
        .catch(response => this.toastService.showAlert('Hiba történt'));
    }
  }

}
