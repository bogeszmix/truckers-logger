import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ParseMinToHM } from 'src/app/home/utils/parse-min-to-hm';
import { ResponseEventModel } from 'src/app/api/models/response/response-event.model';

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

  ngOnInit() {}

  submitEditEvent(event: any) {
    if (event) {
      const modifiedEvent: ResponseEventModel = {
        id: this.eventItemObject.id,
        uniqueSecondaryId: this.eventItemObject.uniqueSecondaryId,
        timeInMin: ParseMinToHM.parseHourMinToMinutesFormat(event.time),
        eventType: event.eventType,
        createDate: this.eventItemObject.createDate,
        createTime: this.eventItemObject.createTime,
        userId: this.eventItemObject.userId
      };
      this.activeModal.close(modifiedEvent);
    }
  }

  closeWithOutSave() {
    this.activeModal.close();
  }

}
