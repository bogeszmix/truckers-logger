import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbPaginationModule,
  NgbDropdownModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

import { CreateEventComponent } from './components/create-event/create-event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { QuickFilteredStatisticsComponent } from './components/quick-filtered-statistics/quick-filtered-statistics.component';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { EditEventComponent } from './components/modals/edit-event/edit-event.component';
import { DeleteEventComponent } from './components/modals/delete-event/delete-event.component';
import { CreateEditEventComponent } from './components/shared/create-edit-event/create-edit-event.component';

@NgModule({
  declarations: [
    EventComponent,
    CreateEventComponent,
    QuickFilteredStatisticsComponent,
    EventListComponent,
    EditEventComponent,
    DeleteEventComponent,
    CreateEditEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    NgbDropdownModule,
    NgbModalModule,
    EventRoutingModule
  ],
  entryComponents: [EditEventComponent, DeleteEventComponent]
})
export class EventModule {}
