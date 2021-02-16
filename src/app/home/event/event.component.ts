import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { RequestEventModel } from 'src/app/api/models/request/request-event.model';
import { EventService } from 'src/app/home/event/event.service';
import { ToastService } from 'src/app/home/shared/components/toast/toast.service';
import { PdfExportModel } from '../shared/models/pdf-export.model';
import { GenerateArrayFromArrayJson } from '../utils/generate-arrays-from-array-json';
import { CreateEventComponent } from './components/modals/create-event/create-event.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  exportableData: PdfExportModel;

  constructor(
    private modalService: NgbModal,
    private eventService: EventService,
    private translationService: TranslocoService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  addNewEvent() {
    const newModalRef = this.modalService.open(CreateEventComponent);

    newModalRef.result.then((newItem: RequestEventModel) => {
      if (newItem) {
        this.eventService
          .addNewEvent(newItem)
          .then(() =>
            this.toastService.showSuccess(
              this.translationService.translate(
                'EVENTS.TOAST.CREATED_SUCCESSFUL'
              )
            )
          )
          .catch((response) =>
            this.toastService.showAlert(
              this.translationService.translate(
                'EVENTS.TOAST.SOMETHING_WENT_WRONG'
              )
            )
          );
      }
    });
  }

  getExportableList(events: any[]) {
    if (events) {
      const headersTranslate = this.translationService.translateObject(
        'EVENTS.LIST_EVENT.LIST.HEADERS'
      );

      let convertedEventList = [...events];

      convertedEventList = convertedEventList.map((element) => {
        element.type = this.translationService.translate(
          `EVENTS.EVENT_TYPES.${element.eventType}`
        );
        return element;
      });

      this.exportableData = {
        headers: [
          [
            '',
            headersTranslate.TIME,
            headersTranslate.CREATED_DATE,
            headersTranslate.EVENT_TYPE,
          ],
        ],
        data: GenerateArrayFromArrayJson.generateArrays(convertedEventList, [
          'uniqueSecondaryId',
          'timeInMin',
          'createDateTime',
          'type',
        ]),
      };
    }
  }
}
