import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ObWorkTimesService } from './ob-work-times.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ObWorkTimeModel } from 'src/app/api/models/request/ob-work-time.model';
import * as moment from 'moment';

@Component({
  selector: 'app-ob-work-times',
  templateUrl: './ob-work-times.component.html',
  styleUrls: ['./ob-work-times.component.scss']
})
export class ObWorkTimesComponent implements OnInit, OnDestroy {
  obWorkTimesSub: Subscription;

  newMonthObWorkForm: FormGroup;
  yearPickerForm: FormGroup;
  yearList: number[];

  workTimesList: ObWorkTimeModel[];

  constructor(
    private formBuilder: FormBuilder,
    private obWorkService: ObWorkTimesService
  ) {}

  ngOnInit() {
    this.workTimesList = [];
    this.yearList = [2020, 2019];
    this.initMonthList();
    this.initYearPickerForm();
    this.initNewMonthObWorkForm();
  }

  ngOnDestroy() {
    if (this.obWorkTimesSub) {
      this.obWorkTimesSub.unsubscribe();
    }
  }

  initMonthList() {
    this.obWorkTimesSub = this.obWorkService._obWorkTimes.subscribe(
      (monthItems: ObWorkTimeModel[]) => {
        if (monthItems && monthItems.length > 0) {
          this.workTimesList = monthItems;
        }
      }
    );
  }

  initNewMonthObWorkForm() {
    this.newMonthObWorkForm = this.formBuilder.group({
      monthSelector: ['', Validators.required],
      obWorkTime: ['']
    });
  }

  initYearPickerForm() {
    this.yearPickerForm = this.formBuilder.group({
      year: [null]
    });
  }

  submitNewMonth(newObWorkMonth: {
    monthSelector: NgbDate;
    obWorkTime?: string;
  }) {
    if (!this.isNewMonthExist(newObWorkMonth, this.workTimesList)) {
      const newWorkTimeModel = {
        id: '3',
        date: newObWorkMonth.monthSelector,
        obWorkTime: Number(newObWorkMonth.obWorkTime) * 60
      } as ObWorkTimeModel;
      this.obWorkService.addNewMonth(newWorkTimeModel);
    }
  }

  isNewMonthExist(
    newObWorkMonth: { monthSelector: NgbDate; obWorkTime?: string },
    workTimeList: ObWorkTimeModel[]
  ): boolean {
    if (newObWorkMonth.monthSelector && workTimeList) {
      const index = workTimeList.findIndex((workTimeItem: ObWorkTimeModel) =>
        moment(workTimeItem.date).isSame(newObWorkMonth.monthSelector)
      );
      return true ? index >= 0 : false;
    }
  }

  onDatePickerChange(event: any) {

    if (event.next) {
      const currentDate = event.next;

      this.newMonthObWorkForm.controls.monthSelector.setValue(
        new NgbDate(currentDate.year, currentDate.month, 1)
      );
    }

    event.preventDefault();
  }
}
