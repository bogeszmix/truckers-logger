import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

import { tap, map } from 'rxjs/operators';
import { ResponseEventModel } from 'src/app/api/models/response/response-event.model';
import { APIEventService } from 'src/app/api/services/api-event.service';
import { RequestEventModel } from 'src/app/api/models/request/request-event.model';
import { AuthService } from 'src/app/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventListSub = new BehaviorSubject<ResponseEventModel[]>([]);
  private filteredEventListSub = new BehaviorSubject<ResponseEventModel[]>([]);

  constructor(
    private eventAPI: APIEventService,
    private authService: AuthService
  ) { }

  get _eventList() {
    if (this.eventListSub) {
      return this.eventListSub.asObservable();
    }
  }

  get _filteredEventList() {
    if (this.filteredEventListSub) {
      return this.filteredEventListSub.asObservable();
    }
  }

  initEventList(filter?: { eventType?: string, dateFrom?: string, dateTo?: string }, orderBy?: string): Observable<any> {
    return this.eventAPI.readEvents(this.authService.getCurrentLoggedInUser()).pipe(
      map((eventMetaArray: any[]) =>
        eventMetaArray.filter((item: any) => {
          const eventFields = item.payload.doc.data();

          if (!filter) {
            return true;
          }

          if (!filter.eventType &&
            moment(eventFields.createDateTime).isBetween(filter.dateFrom, filter.dateTo, 'day', '[]')) {
            return true;
          }

          if (
            filter.eventType &&
            eventFields.eventType === filter.eventType &&
            moment(eventFields.createDateTime).isBetween(filter.dateFrom, filter.dateTo, 'day', '[]')
          ) {
            return true;
          }

        }).map((eventItem: any) => {
            const eventId = eventItem.payload.doc.id;
            const eventFields = eventItem.payload.doc.data();
            return {
              id: eventId,
              ...eventFields
            } as ResponseEventModel;
        })
      ),
      tap((filteredResponse: ResponseEventModel[]) => {
        if (filteredResponse) {
          this.eventListSub.next(filteredResponse);
        }
      })
    );
  }

  filterEvents(filteredEvents: ResponseEventModel[]) {
    this.filteredEventListSub.next(filteredEvents);
  }

  addNewEvent(newEvent: RequestEventModel): Promise<any> {
    if (newEvent) {
      return this.eventAPI.createEvent(newEvent);
    }
  }

  modifyEvent(modifiedEvent: ResponseEventModel): Promise<any> {
    if (modifiedEvent) {
      return this.eventAPI.updateEvent(modifiedEvent);
    }
  }

  deleteEvent(deletedEvent: ResponseEventModel): Promise<any> {
    if (deletedEvent) {
      return this.eventAPI.deleteEvent(deletedEvent);
    }
  }
}
