import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(dateIsoString: string): unknown {
    const dateTimeFormat = 'YYYY-MM-DD HH:mm';
    return moment.isMoment(moment(dateIsoString)) ? moment(dateIsoString).format(dateTimeFormat) : null;
  }

}
