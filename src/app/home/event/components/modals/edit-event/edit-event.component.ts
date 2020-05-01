import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { ParseMinToHM } from 'src/app/home/utils/parse-min-to-hm';
import { ResponseEventModel } from 'src/app/api/models/response/response-event.model';
import { NgbDateToMoment } from 'src/app/home/utils/ngb-date-to-moment';
import { EventModel } from '../../../models/event.model';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  eventItemObject: ResponseEventModel;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  submitEditEvent(event: EventModel) {
    if (event) {
      const modifiedEvent: ResponseEventModel = {
        id: this.eventItemObject.id,
        uniqueSecondaryId: this.eventItemObject.uniqueSecondaryId,
        timeInMin: ParseMinToHM.parseHourMinToMinutesFormat(event.time),
        eventType: event.eventType,
        createDateTime: NgbDateToMoment.convertNgbDateToMoment(event.createdDateTime)
          .add(moment(this.eventItemObject.createDateTime).hour(), 'hour')
          .add(moment(this.eventItemObject.createDateTime).minute(), 'minutes')
          .format(moment.HTML5_FMT.DATETIME_LOCAL),
        userId: this.eventItemObject.userId
      };

      this.activeModal.close(modifiedEvent);
    }
  }

  closeWithOutSave() {
    this.activeModal.close();
  }

}
