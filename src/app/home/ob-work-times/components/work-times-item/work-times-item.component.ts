import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParseMinToHM } from '../../../utils/parse-min-to-hm';
import * as moment from 'moment';
import { EditObWorkTimesComponent } from '../modals/edit-ob-work-times/edit-ob-work-times.component';
import { ResponseObWorkTimeModel } from 'src/app/api/models/response/response-ob-work-time.model';
import { ObWorkTimesService } from '../../ob-work-times.service';

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
    private workTimeService: ObWorkTimesService
  ) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.monthData) {
      this.timeData = {
        date: moment(this.monthData.date).format('YYYY MMMM'),
        obTime: ParseMinToHM.parseMinutesToHourMinFormat(this.monthData.obWorkTime),
      };
    }
  }

  editMonth(mData: ResponseObWorkTimeModel) {
    const monthModalRef = this.modalService.open(EditObWorkTimesComponent);
    if (mData) {
      monthModalRef.componentInstance.data = mData;
    }

    monthModalRef.result.then((resultData: ResponseObWorkTimeModel) => {
      if (resultData) {
        this.workTimeService.modifyObWorkTime(resultData)
        .then(() => console.log('Successful'))
        .catch(response => console.log(response));
      }
    });
  }

}
