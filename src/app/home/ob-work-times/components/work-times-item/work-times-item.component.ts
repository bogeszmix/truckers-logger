import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParseMinToHM } from '../../../utils/parse-min-to-hm';
import moment from 'moment';
import { EditObWorkTimesComponent } from '../modals/edit-ob-work-times/edit-ob-work-times.component';
import { ResponseObWorkTimeModel } from 'src/app/api/models/response/response-ob-work-time.model';
import { ObWorkTimesService } from '../../ob-work-times.service';
import { DeleteObWorkTimesComponent } from '../modals/delete-ob-work-times/delete-ob-work-times.component';
import { ToastService } from 'src/app/home/shared/components/toast/toast.service';
import { TranslationService } from 'src/app/translation/translation.service';

@Component({
  selector: 'app-work-times-item',
  templateUrl: './work-times-item.component.html',
  styleUrls: ['./work-times-item.component.scss']
})
export class WorkTimesItemComponent implements OnInit, OnChanges {

  @Input() monthData: ResponseObWorkTimeModel;

  timeData: any;

  constructor(
    private modalService: NgbModal,
    private workTimeService: ObWorkTimesService,
    private translationService: TranslationService,
    private toastService: ToastService
  ) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.monthData) {
      this.timeData = {
        dateYear: moment(this.monthData.date).format('YYYY'),
        dateMonth: moment(this.monthData.date).format('MMMM'),
        obTime: ParseMinToHM.parseMinutesToHourMinFormat(this.monthData.obWorkTime),
      };
    }
  }

  editMonth(monthData: ResponseObWorkTimeModel) {
    const monthModalRef = this.modalService.open(EditObWorkTimesComponent);
    if (monthData) {
      monthModalRef.componentInstance.data = monthData;
    }

    monthModalRef.result.then((resultData: ResponseObWorkTimeModel) => {
      if (resultData) {
        this.workTimeService.modifyObWorkTime(resultData)
        .then(() => this.toastService.showSuccess(
          this.translationService.getInstant('OBWORK.TOAST.EDITED_SUCCESSFUL')
        ))
        .catch(response => this.toastService.showAlert(
          this.translationService.getInstant('OBWORK.TOAST.SOMETHING_WENT_WRONG')
        ));
      }
    });
  }

  deleteMonth(monthData: ResponseObWorkTimeModel) {
    const monthModalRef = this.modalService.open(DeleteObWorkTimesComponent);
    if (monthData) {
      monthModalRef.componentInstance.data = monthData;
    }

    monthModalRef.result.then((resultData: ResponseObWorkTimeModel) => {
      if (resultData) {
        this.workTimeService.deleteObWorkTime(resultData)
        .then(() => this.toastService.showSuccess(
          this.translationService.getInstant('OBWORK.TOAST.DELETED_SUCCESSFUL')
        ))
        .catch(response => this.toastService.showAlert(
          this.translationService.getInstant('OBWORK.TOAST.SOMETHING_WENT_WRONG')
        ));
      }
    });
  }

}
