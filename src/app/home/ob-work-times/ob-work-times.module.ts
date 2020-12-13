import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { SharedModule } from '../shared/shared.module';
import { DeleteObWorkTimesComponent } from './components/modals/delete-ob-work-times/delete-ob-work-times.component';
import { EditObWorkTimesComponent } from './components/modals/edit-ob-work-times/edit-ob-work-times.component';
import { NewObWorkTimesComponent } from './components/modals/new-ob-work-times/new-ob-work-times.component';
import { WorkTimesItemComponent } from './components/work-times-item/work-times-item.component';
import { ObWorkTimesRoutingModule } from './ob-work-times-routing.module';
import { ObWorkTimesComponent } from './ob-work-times.component';
import { OrderWorkByDatePipe } from './pipes/order-work-by-date.pipe';


@NgModule({
  declarations: [
    ObWorkTimesComponent,
    WorkTimesItemComponent,
    EditObWorkTimesComponent,
    DeleteObWorkTimesComponent,
    OrderWorkByDatePipe,
    NewObWorkTimesComponent
  ],
  imports: [
    CommonModule,
    ObWorkTimesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModalModule,
    TranslocoModule,
    SharedModule
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'home/obwork', alias: 'OBWORK' }
    }
  ]
})
export class ObWorkTimesModule {}
