import { Component, OnInit } from '@angular/core';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/home/shared/components/toast/toast.service';
import { TranslationService } from 'src/app/translation/translation.service';
import { EventService } from 'src/app/home/event/event.service';
import { CreateEventComponent } from './components/modals/create-event/create-event.component';
import { RequestEventModel } from 'src/app/api/models/request/request-event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private eventService: EventService,
    private translationService: TranslationService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  addNewEvent() {
    const newModalRef = this.modalService.open(CreateEventComponent);

    newModalRef.result.then((newItem: RequestEventModel) => {
      if (newItem) {
        this.eventService.addNewEvent(newItem)
          .then(() => this.toastService.showSuccess(
            this.translationService.getInstant('EVENTS.TOAST.CREATED_SUCCESSFUL')
          ))
          .catch(response => this.toastService.showAlert(
            this.translationService.getInstant('EVENTS.TOAST.SOMETHING_WENT_WRONG')
          ));
      }
    });
  }

}
