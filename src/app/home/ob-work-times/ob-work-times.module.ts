import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { ObWorkTimesRoutingModule } from './ob-work-times-routing.module';
import { ObWorkTimesComponent } from './ob-work-times.component';
import { WorkTimesItemComponent } from './components/work-times-item/work-times-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ObWorkTimesComponent, WorkTimesItemComponent],
  imports: [
    CommonModule,
    ObWorkTimesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    ChartsModule
  ]
})
export class ObWorkTimesModule { }
