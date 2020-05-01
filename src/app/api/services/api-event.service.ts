import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ResponseEventModel } from '../models/response/response-event.model';
import { RequestEventModel } from '../models/request/request-event.model';

@Injectable({
    providedIn: 'root'
})
export class APIEventService {

    private readonly BASE_URL = 'events';

    constructor(
        private dbConn: AngularFirestore
    ) {}

    createEvent(event: RequestEventModel): Promise<any> {
        return this.dbConn.collection(this.BASE_URL).add(event);
    }

    readEvent(event: RequestEventModel): Observable<any> {
        return null;
    }

    readEvents(loggedInUser: firebase.User): Observable<any> {
        if (loggedInUser) {
            return this.dbConn.collection(this.BASE_URL, ref => ref.where('userId', '==', loggedInUser.uid))
                .snapshotChanges();
        }
    }

    updateEvent(event: ResponseEventModel): Promise<any> {
        return this.dbConn.collection(this.BASE_URL).doc(event.id).update({
            timeInMin: event.timeInMin,
            eventType: event.eventType,
            createDateTime: event.createDateTime
        });
    }

    deleteEvent(event: ResponseEventModel): Promise<any> {
        return this.dbConn.collection(this.BASE_URL).doc(event.id).delete();
    }

}
