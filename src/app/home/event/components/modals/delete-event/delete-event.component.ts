import { Component, OnInit } from '@angular/core';
import { ExtendedEventModel } from 'src/app/api/models/event.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss']
})
export class DeleteEventComponent implements OnInit {

  deletableEvent: ExtendedEventModel;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  closeWithOutSave() {
    this.activeModal.close();
  }

  delete(acceptDelete: ExtendedEventModel) {
    if (acceptDelete) {
      this.activeModal.close(acceptDelete);
    }
  }

}
