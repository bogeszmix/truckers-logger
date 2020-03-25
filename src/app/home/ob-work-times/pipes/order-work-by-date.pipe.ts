import { Pipe, PipeTransform } from '@angular/core';
import { ResponseObWorkTimeModel } from 'src/app/api/models/response/response-ob-work-time.model';
import * as moment from 'moment';

@Pipe({
  name: 'orderWorkByDate'
})
export class OrderWorkByDatePipe implements PipeTransform {

  transform(events: any, orderBy: string): any {
    if (events) {
      events.sort((a: ResponseObWorkTimeModel, b: ResponseObWorkTimeModel) => {

        if (orderBy === 'ASC') {
          if (moment(a.date).isBefore(b.date)) {
            return -1;
          }
          if (moment(a.date).isAfter(b.date)) {
            return 1;
          }

          return 0;
        } else {
          if (moment(a.date).isBefore(b.date)) {
            return 1;
          }
          if (moment(a.date).isAfter(b.date)) {
            return -1;
          }
          return 0;
        }
      });
    }

    return events;
  }

}
