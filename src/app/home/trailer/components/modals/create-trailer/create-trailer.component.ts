import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestTrailerModel } from 'src/app/api/models/request/request-trailer.model';
import { TrailerModel } from '../../../models/trailer.model';

@Component({
  selector: 'app-create-trailer',
  templateUrl: './create-trailer.component.html',
  styleUrls: ['./create-trailer.component.scss']
})
export class CreateTrailerComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  closeWithOutSave() {
    this.activeModal.dismiss(ModalDismissReasons.ESC);
  }

  submitNewTrailer(newTrailer: TrailerModel) {
    if (newTrailer) {
      const newEvent: RequestTrailerModel = {
        ...newTrailer
      };
  
      this.activeModal.close(newEvent);
    }
  }


}
