import { Component, OnInit, Input } from '@angular/core';
import { ResponseEventModel } from 'src/app/api/models/response/response-event.model';
import { EventService } from '../../../../event.service';
import { TranslationService } from 'src/app/translation/translation.service';
import { ToastService } from 'src/app/home/shared/components/toast/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEventComponent } from '../../../modals/edit-event/edit-event.component';
import { DeleteEventComponent } from '../../../modals/delete-event/delete-event.component';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {

  @Input() eventItem: ResponseEventModel;

  constructor(
    private eventService: EventService,
    private translationService: TranslationService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  editEvent() {
    if (this.eventItem) {
      const editModalRef = this.modalService.open(EditEventComponent);
      editModalRef.componentInstance.eventItemObject = this.eventItem;

      editModalRef.result.then((editedItem: ResponseEventModel) => {
        if (editedItem) {
          this.eventService.modifyEvent(editedItem)
          .then(() => this.toastService.showSuccess(
            this.translationService.getInstant('EVENTS.TOAST.EDITED_SUCCESSFUL')
          ))
          .catch(response => this.toastService.showAlert(
            this.translationService.getInstant('EVENTS.TOAST.SOMETHING_WENT_WRONG')
          ));
        }
      });
    }
  }

  deleteEvent() {
    if (this.eventItem) {
      const deleteModalRef = this.modalService.open(DeleteEventComponent);
      deleteModalRef.componentInstance.deletableEvent = this.eventItem;

      deleteModalRef.result.then((deletedItem: ResponseEventModel) => {
        if (deletedItem) {
          this.eventService.deleteEvent(deletedItem)
          .then(() => this.toastService.showSuccess(
            this.translationService.getInstant('EVENTS.TOAST.DELETED_SUCCESSFUL')
          ))
          .catch(response => this.toastService.showAlert(
            this.translationService.getInstant('EVENTS.TOAST.SOMETHING_WENT_WRONG')
          ));
        }
      });
    }
  }

}
