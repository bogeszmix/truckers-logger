import { Component, OnInit } from '@angular/core';
import { ResponseObWorkTimeModel } from 'src/app/api/models/response/response-ob-work-time.model';
import { ResponseEventModel } from 'src/app/api/models/response/response-event.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-ob-work-times',
  templateUrl: './delete-ob-work-times.component.html',
  styleUrls: ['./delete-ob-work-times.component.scss']
})
export class DeleteObWorkTimesComponent implements OnInit {

  data: ResponseObWorkTimeModel;

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
