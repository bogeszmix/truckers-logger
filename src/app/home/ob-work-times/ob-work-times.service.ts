import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseObWorkTimeModel } from 'src/app/api/models/response/response-ob-work-time.model';
import { APIObWorkService } from 'src/app/api/services/api-ob-work.service';
import { tap, map } from 'rxjs/operators';
import moment from 'moment';
import { RequestObWorkTimeModel } from 'src/app/api/models/request/request-ob-work-time.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ObWorkTimesService {

  obWorkTimes = new BehaviorSubject<ResponseObWorkTimeModel[]>([]);

  constructor(
    private apiWorkTimeService: APIObWorkService,
    private authService: AuthService
  ) { }

  get _obWorkTimes() {
    return this.obWorkTimes.asObservable();
  }

  initWorkTimeList(date?: moment.Moment) {
    return this.apiWorkTimeService.readWorkTimes(this.authService.getCurrentLoggedInUser()).pipe(
      map((eventMetaArray: any) =>
        eventMetaArray.filter((item: any) => {
          const eventFields = item.payload.doc.data();
          if (date && moment(eventFields.date).isSame(date, 'year')) {
            return true;
          }

          if (!date && moment(eventFields.date).isSame(moment(), 'year')) {
            return true;
          }
        }).map((item: any) => {
            const eventId = item.payload.doc.id;
            const eventFields = item.payload.doc.data();
            return {
              id: eventId,
              ...eventFields
            } as ResponseObWorkTimeModel;
          })
      ),
      tap((workTimes: ResponseObWorkTimeModel[]) => {
        if (workTimes) {
          this.obWorkTimes.next(workTimes);
        }
      })
    );
  }

  addNewMonth(newMonth: RequestObWorkTimeModel) {
    if (newMonth) {
      return this.apiWorkTimeService.createWorkTime(newMonth);
    }
  }

  modifyObWorkTime(editableMonth: ResponseObWorkTimeModel): Promise<any> {
    if (editableMonth) {
      return this.apiWorkTimeService.updateWorkTime(editableMonth);
    }
  }

  deleteObWorkTime(deleteableMonth: ResponseObWorkTimeModel): Promise<any> {
    if (deleteableMonth) {
      return this.apiWorkTimeService.deleteWorkTime(deleteableMonth);
    }
  }

}
