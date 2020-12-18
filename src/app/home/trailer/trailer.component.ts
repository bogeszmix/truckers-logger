import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestTrailerModel } from 'src/app/api/models/request/request-trailer.model';
import { TranslationService } from 'src/app/translation/translation.service';
import { ToastService } from '../shared/components/toast/toast.service';
import { CreateTrailerComponent } from './components/modals/create-trailer/create-trailer.component';
import { TrailerService } from './trailer.service';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss']
})
export class TrailerComponent implements OnInit {

  constructor(
    private translationService: TranslationService,
    private toastService: ToastService,
    private trailerService: TrailerService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  addNewEvent() {
    const newModalRef = this.modalService.open(CreateTrailerComponent);

    newModalRef.result.then((newTrailerItem: RequestTrailerModel) => {
      if (newTrailerItem) {
        this.trailerService.addNewTrailer(newTrailerItem)
          .then(() => this.toastService.showSuccess(
            'sikeres'
          ))
          .catch(response => this.toastService.showAlert(
            'nem sikeres'
          ));
      }
    });
  }

}
