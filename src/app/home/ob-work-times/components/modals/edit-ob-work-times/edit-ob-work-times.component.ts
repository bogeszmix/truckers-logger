import { Component, OnInit } from '@angular/core';
import { ObWorkTimeModel } from 'src/app/api/models/request/ob-work-time.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-ob-work-times',
  templateUrl: './edit-ob-work-times.component.html',
  styleUrls: ['./edit-ob-work-times.component.scss']
})
export class EditObWorkTimesComponent implements OnInit {

  data: any;

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
      workTime: [this.data.obTime, [Validators.required]]
    });
  }

  closeWithOutSave() {
    this.activeModal.close();
  }

  submitForm(formValue: any) {
    if (formValue) {
      this.activeModal.close(formValue);
    }
  }

}
