import { DateNgBootstrapModel } from '../event/models/date-ngbootstrap.model';
import moment from 'moment';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class NgbDateToMoment {
    /**
     * The method convert ngBootstrap Datepicker's native date object to moment.
     * It is decreasing native date month with 1, because ngBoostrap starts the month counting with 0,
     * but moment starts with 1.
     * If input date is undefined the method will return with now().
     * @param date Date to convert
     */
    public static convertNgbDateToMoment(date: DateNgBootstrapModel): moment.Moment {
        let convertableDate: NgbDate;
        if (date) {
            const normalizedDate = {
                year: date.year,
                month: date.month - 1,
                day: date.day
            } as DateNgBootstrapModel;
            convertableDate = NgbDate.from(normalizedDate);
            return moment(convertableDate).isValid() ? moment(convertableDate) : moment();
        }
        return moment();
    }
}
