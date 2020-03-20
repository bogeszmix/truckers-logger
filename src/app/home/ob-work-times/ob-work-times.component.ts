import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ObWorkTimesService } from './ob-work-times.service';
import * as moment from 'moment';
import { ResponseObWorkTimeModel } from 'src/app/api/models/response/response-ob-work-time.model';
import { RequestObWorkTimeModel } from 'src/app/api/models/request/request-ob-work-time.model';
import { ParseMinToHM } from '../utils/parse-min-to-hm';
import { AuthService } from 'src/app/auth/auth.service';
import { WorkTimeRegex } from '../enums/work-time-regex.enum';
import { ToastService } from '../shared/toast/toast.service';

@Component({
  selector: 'app-ob-work-times',
  templateUrl: './ob-work-times.component.html',
  styleUrls: ['./ob-work-times.component.scss']
})
export class ObWorkTimesComponent implements OnInit, OnDestroy {
  obWorkTimesSub: Subscription;

  newMonthObWorkForm: FormGroup;
  yearPickerForm: FormGroup;
  filterYearList: number[] = [];
  newFormMonthList: string[] = [];
  newFormYearList: number[] = [];

  workTimesList: ResponseObWorkTimeModel[] = [];

  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private obWorkService: ObWorkTimesService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.obWorkTimesSub = new Subscription();
    this.initDatePickerValues();
    this.initMonthList();
    this.initYearPickerForm();
    this.initNewMonthObWorkForm();
    this.yearPickerFormChange();
  }

  ngOnDestroy() {
    if (this.obWorkTimesSub) {
      this.obWorkTimesSub.unsubscribe();
    }
  }

  initDatePickerValues() {
    this.newFormMonthList = moment.months();
    for (let i = moment().add(1, 'year').year(); i >= 2000; i--) {
      this.newFormYearList.push(i);
      this.filterYearList.push(i);
    }
  }

  initMonthList() {
    this.isLoading = true;
    this.obWorkTimesSub.add(this.obWorkService.initWorkTimeList().subscribe(() => this.isLoading = false));
    this.obWorkTimesSub.add(this.obWorkService._obWorkTimes.subscribe(
      (monthItems: ResponseObWorkTimeModel[]) => {
        if (monthItems) {
          this.workTimesList = monthItems;
        }
      }
    ));
  }

  initNewMonthObWorkForm() {
    this.newMonthObWorkForm = this.formBuilder.group({
      monthSelector: [null, Validators.required],
      yearSelector: [moment().year(), Validators.required],
      obWorkTime: ['', Validators.pattern(new RegExp(WorkTimeRegex.FORMAT))]
    });
  }

  initYearPickerForm() {
    this.yearPickerForm = this.formBuilder.group({
      year: [moment().year()]
    });
  }

  yearPickerFormChange() {
    if (this.yearPickerForm) {
      this.obWorkTimesSub.add(this.yearPickerForm.valueChanges.subscribe((values: any) => {
        if (values && !isNaN(values.year)) {
          this.obWorkTimesSub.add(
            this.obWorkService.initWorkTimeList(moment().year(values.year)).subscribe()
          );
        }
      }));
    }
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
      this.obWorkService.addNewMonth(newWorkTimeModel)
      .then(() => this.toastService.showSuccess('Sikeresen létrehozva'))
      .catch(response => this.toastService.showAlert('Hiba történt'));
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
      return true ? index >= 0 : false;
    }
  }
}
