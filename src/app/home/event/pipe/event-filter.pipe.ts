import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { ExtendedEventModel } from 'src/app/api/models/event.model';

import { DateFormat } from '../../enums/date-format.enum';
import { EventFilterModel } from '../models/event-filter.model';
import { EventTypes } from '../../enums/event-types.enum';

@Pipe({
    name: 'eventFilter'
})

/**
 * https://stackoverflow.com/questions/41672578/filter-on-multiple-columns-using-one-pipe-angular-2
 * https://stackoverflow.com/questions/48179433/multiple-parameters-on-angular-filter-pipe
 */
export class EventFilterPipe implements PipeTransform {

    transform(eventList: Array<ExtendedEventModel>, filter: EventFilterModel): Array<ExtendedEventModel> {
        let returnableEventList: ExtendedEventModel[];

        // If no eventList somehow
        if (!eventList) {returnableEventList = []; console.log('1');
        }

        // If eventList available, but no filter data
        if (eventList && !filter.eventType && !filter.dateFrom && !filter.dateTo) {
            returnableEventList = eventList; console.log('2 ez jó'); }

        // If everything is available (list and filters)
        if (eventList && filter.eventType && filter.dateFrom && filter.dateTo) {
            console.log('3 ez jó');
            returnableEventList = eventList.filter((event: ExtendedEventModel) => {
                if (event.eventType === filter.eventType) {
                    return moment(event.createDate).isBetween(moment(filter.dateFrom), moment(filter.dateTo));
                }
            });
        }

        // If list is available but no dateTo
        if (eventList && filter.eventType && filter.dateFrom && !filter.dateTo) {
            console.log('4 ez jó');
            returnableEventList = eventList.filter((event: ExtendedEventModel) => {
                if (event.eventType === filter.eventType) {
                    return moment(event.createDate).isBetween(moment(filter.dateFrom), moment());
                }
            });
        }

        // If list is available but no dateFrom and dateTo
        if (eventList && filter.eventType && !filter.dateFrom && !filter.dateTo) {
            console.log('5 ez jó');
            returnableEventList = eventList.filter((event: ExtendedEventModel) =>
                event.eventType === filter.eventType);
        }

        return returnableEventList;
    }
}
