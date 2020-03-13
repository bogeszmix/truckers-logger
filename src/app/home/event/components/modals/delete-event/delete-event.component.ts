import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseEventModel } from 'src/app/api/models/response/response-event.model';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss']
})
export class DeleteEventComponent implements OnInit {

  deletableEvent: ResponseEventModel;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  closeWithOutSave() {
    this.activeModal.close();
  }

  delete(acceptDelete: ResponseEventModel) {
    if (acceptDelete) {
      this.activeModal.close(acceptDelete);
    }
  }

}
