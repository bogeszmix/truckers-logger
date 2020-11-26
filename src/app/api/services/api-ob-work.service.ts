import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RequestObWorkTimeModel } from '../models/request/request-ob-work-time.model';
import { ResponseObWorkTimeModel } from '../models/response/response-ob-work-time.model';

@Injectable({
    providedIn: 'root'
})
export class APIObWorkService {

    private readonly BASE_URL = 'ob-works';

    constructor(
        private dbConn: AngularFirestore
    ) {}

    createWorkTime(workTime: RequestObWorkTimeModel): Promise<any> {
        return this.dbConn.collection(this.BASE_URL).add(workTime);
    }

    readWorkTime(workTime: RequestObWorkTimeModel): Observable<any> {
        return null;
    }

    readWorkTimes(loggedInUser: firebase.default.User): Observable<any> {
        if (loggedInUser) {
            return this.dbConn.collection(this.BASE_URL, ref => ref.where('userId', '==', loggedInUser.uid))
                .snapshotChanges();
        }
    }

    updateWorkTime(workTime: ResponseObWorkTimeModel): Promise<any> {
        return this.dbConn.collection(this.BASE_URL).doc(workTime.id).update({
            obWorkTime: workTime.obWorkTime
        });
    }

    deleteWorkTime(workTime: ResponseObWorkTimeModel): Promise<any> {
        return this.dbConn.collection(this.BASE_URL).doc(workTime.id).delete();
    }

}
