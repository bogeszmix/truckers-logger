import { Component, OnInit } from '@angular/core';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/home/shared/components/toast/toast.service';
import { TranslationService } from 'src/app/translation/translation.service';
import { EventService } from 'src/app/home/event/event.service';
import { CreateEventComponent } from './components/modals/create-event/create-event.component';
import { RequestEventModel } from 'src/app/api/models/request/request-event.model';
import { PdfExportModel } from '../shared/models/pdf-export.model';
import { GenerateArrayFromArrayJson } from '../utils/generate-arrays-from-array-json';
import { ResponseObWorkTimeModel } from 'src/app/api/models/response/response-ob-work-time.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  exportableData: PdfExportModel;

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

  getExportableList(events: any[]) {
    if (events) {
      const headersTranslate = this.translationService.getTranslateObject('EVENTS.LIST_EVENT.LIST.HEADERS');

      let convertedEventList = [...events];

      convertedEventList = convertedEventList.map(element => {
        element.type = this.translationService.getInstant(`EVENTS.EVENT_TYPES.${element.eventType}`);
        return element;
      });

      this.exportableData = {
        headers: [[
          '',
          headersTranslate.TIME,
          headersTranslate.CREATED_DATE,
          headersTranslate.EVENT_TYPE,
        ]],
        data: GenerateArrayFromArrayJson.generateArrays(
          convertedEventList,
          ['uniqueSecondaryId', 'timeInMin', 'createDateTime', 'type'])
      };
      return true;
    } else {
      return false;
    }
  }

}
