import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { ExtendedEventModel } from 'src/app/api/models/event.model';

import { DateFormat } from '../../enums/date-format.enum';
import { EventFilterModel } from '../models/event-filter.model';

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

        if (!eventList) {returnableEventList = []; }

        if (eventList && !filter.eventType && !filter.dateFrom && !filter.dateTo) {returnableEventList = eventList; }

        if (eventList && filter.eventType && filter.dateFrom && filter.dateTo) {
            returnableEventList = eventList.filter((event: ExtendedEventModel) => {
                let isFilterMatchToField: string;
                // With event type but no dates
                if (filter.eventType) {
                    console.log('IZE');
                    isFilterMatchToField = Object.keys(filter).find(filterKey => event[filterKey] !== filter[filterKey]);
                }
                if (filter.dateFrom && filter.dateTo) {
                    console.log('BAZE');
                    isFilterMatchToField = moment(event.createDate).isBetween(
                        moment(filter.dateFrom).format(DateFormat.HUN_DATE_FORMAT),
                        moment(filter.dateTo).format(DateFormat.HUN_DATE_FORMAT)
                    ) ? 'something' : undefined;
                }

            });
        }

        return returnableEventList;
    }
}
