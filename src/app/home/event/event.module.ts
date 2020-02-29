import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { CreateEventComponent } from './components/create-event/create-event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import {
  QuickFilteredStatisticsComponent,
} from './components/quick-filtered-statistics/quick-filtered-statistics.component';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';


@NgModule({
  declarations: [EventComponent, CreateEventComponent, QuickFilteredStatisticsComponent, EventListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    EventRoutingModule
  ]
})
export class EventModule { }
