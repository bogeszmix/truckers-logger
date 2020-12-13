import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,

  NgbDropdownModule,
  NgbModalModule, NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { SharedModule } from '../shared/shared.module';
import { EventFilterComponent } from './components/event-list/components/event-filter/event-filter.component';
import { EventItemComponent } from './components/event-list/components/event-item/event-item.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { CreateEventComponent } from './components/modals/create-event/create-event.component';
import { DeleteEventComponent } from './components/modals/delete-event/delete-event.component';
import { EditEventComponent } from './components/modals/edit-event/edit-event.component';
import { QuickFilteredStatisticsComponent } from './components/quick-filtered-statistics/quick-filtered-statistics.component';
import { CreateEditEventComponent } from './components/shared/create-edit-event/create-edit-event.component';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { DateFormatTimePipe } from './pipes/date-format-time.pipe';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';


@NgModule({
  declarations: [
    EventComponent,
    CreateEventComponent,
    QuickFilteredStatisticsComponent,
    EventListComponent,
    EditEventComponent,
    DeleteEventComponent,
    CreateEditEventComponent,
    OrderByDatePipe,
    EventItemComponent,
    EventFilterComponent,
    DateFormatTimePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    NgbDropdownModule,
    NgbModalModule,
    TranslocoModule,
    EventRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: {scope: 'home/events', alias: 'EVENTS'} }
  ]
})
export class EventModule {}
