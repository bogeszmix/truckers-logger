import { Moment } from 'moment';

export interface EventModel {
    id: number;
    uniqueSecondaryId: string;
    timeInMin: number;
    eventType: {key: string, value: string};
}

export interface ExtendedEventModel extends EventModel {
    createDate: string;
    createTime: string;
}
