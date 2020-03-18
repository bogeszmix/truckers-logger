import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseObWorkTimeModel } from 'src/app/api/models/response/response-ob-work-time.model';
import { ParseMinToHM } from 'src/app/home/utils/parse-min-to-hm';
import { WorkTimeRegex } from 'src/app/home/enums/work-time-regex.enum';

@Component({
  selector: 'app-edit-ob-work-times',
  templateUrl: './edit-ob-work-times.component.html',
  styleUrls: ['./edit-ob-work-times.component.scss']
})
export class EditObWorkTimesComponent implements OnInit {

  data: ResponseObWorkTimeModel;

  editWorkForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.editWorkForm = this.formBuilder.group({
      workTime: [ParseMinToHM.parseMinutesToHourMinFormat(this.data.obWorkTime),
          [
            Validators.required,
            Validators.pattern(new RegExp(WorkTimeRegex.FORMAT))
          ]]
    });
  }

  closeWithOutSave() {
    this.activeModal.close();
  }

  submitForm(formValue: any) {
    if (formValue && formValue.workTime) {
      this.data.obWorkTime = ParseMinToHM.parseHourMinToMinutesFormat(formValue.workTime);
      this.activeModal.close(this.data);
    }
  }

}
