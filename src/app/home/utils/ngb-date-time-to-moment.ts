import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import moment, { Moment } from 'moment';
import { dateTimeRegex } from './validators.regex';

export class NgbDateTimeToMoment {
  public static parseIsoDatetoDateStruct(isoDate: string): NgbDateStruct {
    console.log('parse: ', isoDate);
    if (moment(isoDate).isValid()) {
      const momentIso = moment(isoDate);
      return {
        year: momentIso.year(),
        month: momentIso.month(),
        day: momentIso.date(),
      };
    }
  }

  public static parseIsoDatetoTimeStruct(isoDate: string): NgbTimeStruct {
    if (moment(isoDate).isValid()) {
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
      momentObject.date(date.day);
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
      momentObject.month(date.month - 1);
      momentObject.date(date.day);
      momentObject.hour(time.hour);
      momentObject.minute(time.minute);
      momentObject.second(time.second);
      return momentObject;
    } else {
      return null;
    }
  }

  public static formatInputDateTimeStringToMoment(unformattedInputDateTimeString: string): Moment {
    if (dateTimeRegex.test(unformattedInputDateTimeString)) {
      return moment(new Date(unformattedInputDateTimeString));
    } else {
      return null;
    }
  }

}
