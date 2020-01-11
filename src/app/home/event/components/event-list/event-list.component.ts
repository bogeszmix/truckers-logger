import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExtendedEventModel } from 'src/app/api/models/event.model';
import { EventService } from 'src/app/home/event.service';
import { Subscription } from 'rxjs';
import { EventTypes } from '../../../enums/event-types.enum';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  eventListSub: Subscription;

  eventList: ExtendedEventModel[];
  eventTypesObject: any;

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventTypesObject = Object.assign(EventTypes);
    this.initEventList();
  }

  initEventList() {
    this.eventListSub = this.eventService._eventList.subscribe((eventList: ExtendedEventModel[]) => {
      if (eventList) {
        this.eventList = eventList;
      }
    });
  }

  ngOnDestroy() {
    if (this.eventListSub) {
      this.eventListSub.unsubscribe();
    }
  }

}
