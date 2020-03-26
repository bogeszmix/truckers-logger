import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatTime'
})
export class DateFormatTimePipe implements PipeTransform {

  transform(value: string): string {
    const splittableDateString = value.split('T');
    return `${splittableDateString[0]} ${splittableDateString[1]}`;
  }

}
