import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ResponseObWorkTimeModel } from 'src/app/api/models/response/response-ob-work-time.model';
import { WorkTimeRegex } from 'src/app/home/enums/work-time-regex.enum';
import { ParseMinToHM } from 'src/app/home/utils/parse-min-to-hm';
import { RequestObWorkTimeModel } from 'src/app/api/models/request/request-ob-work-time.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ObWorkTimesService } from '../../../ob-work-times.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-ob-work-times',
  templateUrl: './new-ob-work-times.component.html',
  styleUrls: ['./new-ob-work-times.component.scss']
})
export class NewObWorkTimesComponent implements OnInit {
  newObWorkTimesSub: Subscription;
  newMonthObWorkForm: FormGroup;
  newFormMonthList: string[] = [];
  newFormYearList: number[] = [];
  workTimesList: ResponseObWorkTimeModel[] = [];
  isMonthAlreadyExist = false;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.newObWorkTimesSub = new Subscription();
    this.newFormMonthList = moment.months();
    this.initNewMonthObWorkForm();
    this.onNewMonthObWorkFormChange();
  }



  onNewMonthObWorkFormChange() {
    this.newObWorkTimesSub.add(this.newMonthObWorkForm.valueChanges.subscribe(values => {
      this.isNewMonthExist({
        yearSelector: values.yearSelector,
        monthSelector: values.monthSelector
      }, this.workTimesList);
    }));
  }

  initNewMonthObWorkForm() {
    this.newMonthObWorkForm = this.formBuilder.group({
      monthSelector: [null, Validators.required],
      yearSelector: [moment().year(), Validators.required],
      obWorkTime: ['', Validators.pattern(new RegExp(WorkTimeRegex.FORMAT))]
    });
  }

  closeWithOutSave() {
    this.activeModal.close();
  }

  submitNewMonth(newObWorkMonth: { yearSelector: number, monthSelector: string; obWorkTime?: string }) {
    if (!this.isNewMonthExist(newObWorkMonth, this.workTimesList)) {
      const newWorkTimeModel = {
        date: moment()
          .year(newObWorkMonth.yearSelector)
          .month(newObWorkMonth.monthSelector)
          .format(moment.HTML5_FMT.DATE),
        obWorkTime: ParseMinToHM.parseHourMinToMinutesFormat(newObWorkMonth.obWorkTime),
        userId: this.authService.getCurrentLoggedInUser().uid
      } as RequestObWorkTimeModel;

      this.activeModal.close(newWorkTimeModel);
    }
  }

  isNewMonthExist(
    newObWorkMonth: { yearSelector: number, monthSelector: string; obWorkTime?: string },
    workTimeList: ResponseObWorkTimeModel[]
  ): boolean {
    if (newObWorkMonth.monthSelector && workTimeList) {
      const index = workTimeList.findIndex((workTimeItem: ResponseObWorkTimeModel) =>
        moment().year(newObWorkMonth.yearSelector).month(newObWorkMonth.monthSelector)
          .isSame(workTimeItem.date, 'month')
      );
      const isExists = true ? index >= 0 : false;
      this.isMonthAlreadyExist = isExists;
      return isExists;
    }
  }

}
