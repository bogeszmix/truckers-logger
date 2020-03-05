import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { ObWorkTimesRoutingModule } from './ob-work-times-routing.module';
import { ObWorkTimesComponent } from './ob-work-times.component';
import { WorkTimesItemComponent } from './components/work-times-item/work-times-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditObWorkTimesComponent } from './components/modals/edit-ob-work-times/edit-ob-work-times.component';


@NgModule({
  declarations: [ObWorkTimesComponent, WorkTimesItemComponent, EditObWorkTimesComponent],
  imports: [
    CommonModule,
    ObWorkTimesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModalModule,
    ChartsModule
  ],
  entryComponents: [EditObWorkTimesComponent]
})
export class ObWorkTimesModule { }
