import { Moment } from 'moment';

export interface EventModel {
    id: number;
    timeHour: number;
    timeMinutes: number;
    eventType: string;
}

export interface ExtendedEventModel extends EventModel {
    createDate: string;
    createTime: string;
}
