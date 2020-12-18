import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { ResponseEventModel } from 'src/app/api/models/response/response-event.model';
import { AuthService } from 'src/app/auth/auth.service';
import { NgbDateToMoment } from 'src/app/home/utils/ngb-date-to-moment';
import { ParseMinToHM } from 'src/app/home/utils/parse-min-to-hm';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  private curr

  constructor(
    private activeModal: NgbActiveModal,
    private authService: AuthService

  ) { }

  ngOnInit() {}

  submitNewEvent(event: any) {
    if (event) {
      const newEvent: ResponseEventModel = {
        uniqueSecondaryId: moment().format('x').toString(),
        timeInMin: ParseMinToHM.parseHourMinToMinutesFormat(event.time),
        eventType: event.eventType,
        createDateTime: NgbDateToMoment.convertNgbDateToMoment(event.createdDateTime)
          .add(moment().hour(), 'hour')
          .add(moment().minute(), 'minute')
          .format(moment.HTML5_FMT.DATETIME_LOCAL),
        userId: this.authService._currentLoggedInUser.uid
      };

      this.activeModal.close(newEvent);
    }
  }

  closeWithOutSave() {
    this.activeModal.close();
  }

}
