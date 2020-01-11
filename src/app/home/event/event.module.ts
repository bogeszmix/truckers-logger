import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms' ;
import { NgbDatepickerModule  } from '@ng-bootstrap/ng-bootstrap';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { from } from 'rxjs';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { QuickFilteredStatisticsComponent } from './components/quick-filtered-statistics/quick-filtered-statistics.component';
import { EventListComponent } from './components/event-list/event-list.component';


@NgModule({
  declarations: [EventComponent, CreateEventComponent, QuickFilteredStatisticsComponent, EventListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    EventRoutingModule
  ]
})
export class EventModule { }
