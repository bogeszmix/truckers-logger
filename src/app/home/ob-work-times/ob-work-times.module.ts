import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObWorkTimesRoutingModule } from './ob-work-times-routing.module';
import { ObWorkTimesComponent } from './ob-work-times.component';
import { WorkTimesItemComponent } from './components/work-times-item/work-times-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditObWorkTimesComponent } from './components/modals/edit-ob-work-times/edit-ob-work-times.component';
import { DeleteObWorkTimesComponent } from './components/modals/delete-ob-work-times/delete-ob-work-times.component';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';


@NgModule({
  declarations: [ObWorkTimesComponent, WorkTimesItemComponent, EditObWorkTimesComponent, DeleteObWorkTimesComponent],
  imports: [
    CommonModule,
    ObWorkTimesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModalModule,
    TranslocoModule
  ],
  entryComponents: [EditObWorkTimesComponent, DeleteObWorkTimesComponent],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: {scope: 'home/obwork', alias: 'OBWORK'} }
  ]
})
export class ObWorkTimesModule { }
