import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TrailerModel } from '../../../models/trailer.model';

@Component({
  selector: 'app-create-edit-trailer',
  templateUrl: './create-edit-trailer.component.html',
  styleUrls: ['./create-edit-trailer.component.scss']
})
export class CreateEditTrailerComponent implements OnInit {
  @Output() trailerFormResult = new EventEmitter<TrailerModel>();

  trailerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initTrailerForm();
  }

  initTrailerForm() {
    this.trailerForm = this.formBuilder.group({
      licencePlate: new FormControl('', Validators.required),
      tractorNumber: new FormControl('', Validators.required) 
    });
  }

  submitTrailer(trailerForm: FormGroup) {
    this.trailerFormResult.emit(trailerForm.value);
  }

}
