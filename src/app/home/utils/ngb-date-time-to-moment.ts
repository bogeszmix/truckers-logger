import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import moment, { Moment } from 'moment';

export class NgbDateTimeToMoment {
  public static parseIsoDatetoDateStruct(isoDate: string): NgbDateStruct {
    if (moment.isDate(isoDate)) {
      const momentIso = moment(isoDate);
      return {
        year: momentIso.year(),
        month: momentIso.month() - 1,
        day: momentIso.day(),
      };
    }
  }

  public static parseIsoDatetoTimeStruct(isoDate: string): NgbTimeStruct {
    if (moment.isDate(isoDate)) {
      const momentIso = moment(isoDate);
      return {
        hour: momentIso.hour(),
        minute: momentIso.minute(),
        second: momentIso.second(),
      };
    } else {
      return null;
    }
  }

  public static formatDateTimeStructToIsoDate(
    date: NgbDateStruct,
    time: NgbTimeStruct
  ): string {
    if (date && time) {
      const momentObject = moment();
      momentObject.year(date.year);
      momentObject.month(date.month);
      momentObject.day(date.day);
      momentObject.hour(time.hour);
      momentObject.minute(time.minute);
      momentObject.second(time.second);
      return momentObject.utc().toISOString();
    } else {
      return null;
    }
  }

  public static formatDateTimeStructToMoment(
    date: NgbDateStruct,
    time: NgbTimeStruct
  ): Moment {
    if (date && time) {
      const momentObject = moment();
      momentObject.year(date.year);
      momentObject.month(date.month);
      momentObject.day(date.day);
      momentObject.hour(time.hour);
      momentObject.minute(time.minute);
      momentObject.second(time.second);
      return momentObject;
    } else {
      return null;
    }
  }
}
