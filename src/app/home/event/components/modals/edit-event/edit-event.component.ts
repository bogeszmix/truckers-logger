import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  eventItemObject: any;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {}

  submitEditEvent(event: any) {
    if (event) {
      this.activeModal.close(event);
    }
  }

  closeWithOutSave() {
    this.activeModal.close();
  }

}
