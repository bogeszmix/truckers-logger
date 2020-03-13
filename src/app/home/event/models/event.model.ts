export interface EventModel {
    id: string;
    uniqueSecondaryId: string;
    timeInMin: number;
    eventType: {key: string, value: string};
}

export interface ExtendedEventModel extends EventModel {
    createDate: string;
    createTime: string;
}

