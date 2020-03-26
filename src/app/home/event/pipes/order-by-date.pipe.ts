import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { ResponseEventModel } from 'src/app/api/models/response/response-event.model';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

  transform(events: any, orderBy: string): any {
    if (events) {
      events.sort((a: ResponseEventModel, b: ResponseEventModel) => {

        if (orderBy === 'ASC') {
          if (moment(a.createDateTime).isBefore(b.createDateTime)) {
            return -1;
          }
          if (moment(a.createDateTime).isAfter(b.createDateTime)) {
            return 1;
          }

          return 0;
        } else {
          if (moment(a.createDateTime).isBefore(b.createDateTime)) {
            return 1;
          }
          if (moment(a.createDateTime).isAfter(b.createDateTime)) {
            return -1;
          }
          return 0;
        }
      });
    }

    return events;
  }

}
