import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ObWorkTimesService } from './ob-work-times.service';
import moment from 'moment';
import { ResponseObWorkTimeModel } from 'src/app/api/models/response/response-ob-work-time.model';
import { RequestObWorkTimeModel } from 'src/app/api/models/request/request-ob-work-time.model';
import { ParseMinToHM } from '../utils/parse-min-to-hm';
import { AuthService } from 'src/app/auth/auth.service';
import { WorkTimeRegex } from '../enums/work-time-regex.enum';
import { ToastService } from '../shared/components/toast/toast.service';
import { TranslationService } from 'src/app/translation/translation.service';
import { OrderOptionModel } from '../shared/models/order-option.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewObWorkTimesComponent } from './components/modals/new-ob-work-times/new-ob-work-times.component';
import { PdfExportModel } from '../shared/models/pdf-export.model';
import { GenerateArrayFromArrayJson } from '../utils/generate-arrays-from-array-json';

@Component({
  selector: 'app-ob-work-times',
  templateUrl: './ob-work-times.component.html',
  styleUrls: ['./ob-work-times.component.scss']
})
export class ObWorkTimesComponent implements OnInit, OnDestroy {
  obWorkTimesSub: Subscription;
  yearPickerForm: FormGroup;
  filterYearList: number[] = [];
  workTimesList: ResponseObWorkTimeModel[] = [];
  orderOptionList: OrderOptionModel[];
  exportableData: PdfExportModel;
  orderOpt: string;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private obWorkService: ObWorkTimesService,
    private translationService: TranslationService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.obWorkTimesSub = new Subscription();
    this.initMonthList();
    this.initDatePickerValues();
    this.initYearPickerForm();
    this.initOrderOptionList();
    this.yearPickerFormChange();
  }

  ngOnDestroy() {
    if (this.obWorkTimesSub) {
      this.obWorkTimesSub.unsubscribe();
    }
  }

  initExportData(workTimes: ResponseObWorkTimeModel[]) {
    if (workTimes) {
      const headersTranslate = this.translationService.getTranslateObject('OBWORK.LIST_ITEM');

      this.exportableData = {
        headers: [[
          headersTranslate.DATE_LABEL,
          headersTranslate.OB_TIME
        ]],
        data: GenerateArrayFromArrayJson.generateArrays(workTimes, ['date', 'obWorkTime'], 'obWorkTime')
      };
      return true;
    } else {
      return false;
    }
  }

  initDatePickerValues() {
    for (let i = moment().add(1, 'year').year(); i >= 2000; i--) {
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
          this.initExportData(this.workTimesList);
        }
      }
    ));
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
          this.initExportData(this.workTimesList);
        }
      }));
    }
  }

  initOrderOptionList() {
    this.orderOptionList = [
      {
        value: 'DESC',
        translateKey: 'OBWORK.LIST_OBWORK.ORDER_OPTIONS.DESC',
        default: true
      },
      {
        value: 'ASC',
        translateKey: 'OBWORK.LIST_OBWORK.ORDER_OPTIONS.ASC'
      }
    ];
  }

  addMonth() {
    const monthModalRef = this.modalService.open(NewObWorkTimesComponent);

    monthModalRef.componentInstance.newFormYearList = this.filterYearList;
    monthModalRef.componentInstance.workTimesList = this.workTimesList;

    monthModalRef.result.then((newWorkTimeModel: RequestObWorkTimeModel) => {
      if (newWorkTimeModel) {
        this.obWorkService.addNewMonth(newWorkTimeModel)
          .then(() => this.toastService.showSuccess(
            this.translationService.getInstant('OBWORK.TOAST.CREATED_SUCCESSFUL')
          ))
          .catch(response => this.toastService.showAlert(
            this.translationService.getInstant('OBWORK.TOAST.SOMETHING_WENT_WRONG')
          ));
      }
    });
  }

  selectedOrder(selectedObj: string) {
    this.orderOpt = selectedObj;
  }
}
