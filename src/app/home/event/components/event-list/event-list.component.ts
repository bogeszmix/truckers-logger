import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExtendedEventModel } from 'src/app/api/models/event.model';
import { EventService } from 'src/app/home/event.service';
import { Subscription } from 'rxjs';
import { EventTypes } from '../../../enums/event-types.enum';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  eventListSub: Subscription;

  filterForm: FormGroup;

  eventList: ExtendedEventModel[];
  filterableEventList: ExtendedEventModel[];
  eventTypesObject: any;
  eventTypes: EventTypes;
  eventTypeOptions: any[];

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.eventTypeOptions = Object.assign(EventTypes);
    this.eventTypesObject = Object.assign(EventTypes);
    this.initFilterForm();
    this.initEventList();
  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      eventType: [null],
      dateFrom: [''],
      dateTo: ['']
    });
  }

  initEventList() {
    this.eventListSub = this.eventService._eventList.subscribe((eventList: ExtendedEventModel[]) => {
      if (eventList) {
        this.eventList = eventList;
        this.filterableEventList = this.eventList;
      }
    });
  }

  ngOnDestroy() {
    if (this.eventListSub) {
      this.eventListSub.unsubscribe();
    }
  }

  /**
   * 
   * @param filterData Filter pipe kell
   */
  submitFilterForm(filterData: any) {
    if (filterData) {
      this.filterableEventList.filter(x => x.eventType === filterData.eventType);
    }
  }
}
