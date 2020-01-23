import { EventTimeModel } from './event-time.model';

export interface QuickStatisticsResultModel {
    driveAndOtherAndPaidHolidaysResult?: EventTimeModel;
    driveAndOtherResult?: EventTimeModel;
    driveResult?: EventTimeModel;
    otherResult?: EventTimeModel;
    standByResult?: EventTimeModel;
    paidLeaveResult?: EventTimeModel;
    sickPayResult?: EventTimeModel;
    paidHolidayResult?: EventTimeModel;
}

export class QuickStatisticsResultModelImpl {
    driveAndOtherResult?: EventTimeModel;
    driveResult?: EventTimeModel;
    otherResult?: EventTimeModel;
    standByResult?: EventTimeModel;
    paidLeaveResult?: EventTimeModel;
    sickPayResult?: EventTimeModel;
    paidHolidayResult?: EventTimeModel;
    driveAndOtherAndPaidHolidaysResult: EventTimeModel;

    constructor(quickStatModel?: QuickStatisticsResultModel) {
        this.driveAndOtherResult = quickStatModel.driveAndOtherResult;
        this.driveResult = quickStatModel.driveResult;
        this.otherResult = quickStatModel.otherResult;
        this.standByResult = quickStatModel.standByResult;
        this.paidLeaveResult = quickStatModel.paidLeaveResult;
        this.sickPayResult = quickStatModel.sickPayResult;
        this.paidHolidayResult = quickStatModel.paidHolidayResult;
        this.driveAndOtherAndPaidHolidaysResult = quickStatModel.driveAndOtherAndPaidHolidaysResult;
    }

    get _driveAndOtherResult() {
        return this.driveAndOtherResult;
    }

    setDriveAndOtherResult(eventTimeObj: EventTimeModel) {
        this.driveAndOtherResult = eventTimeObj;
    }

    get _driveResult() {
        return this.driveResult;
    }

    setDriveResult(eventTimeObj: EventTimeModel) {
        this.driveResult = eventTimeObj;
    }

    get _otherResult() {
        return this.otherResult;
    }

    setOtherResult(eventTimeObj: EventTimeModel) {
        this.otherResult = eventTimeObj;
    }

    get _standByResult() {
        return this.standByResult;
    }

    setStandByResult(eventTimeObj: EventTimeModel) {
        this.standByResult = eventTimeObj;
    }

    get _paidLeaveResult() {
        return this.paidLeaveResult;
    }

    setPaidLeaveResult(eventTimeObj: EventTimeModel) {
        this.paidLeaveResult = eventTimeObj;
    }

    get _sickPayResult() {
        return this.sickPayResult;
    }

    setSickPayResult(eventTimeObj: EventTimeModel) {
        this.sickPayResult = eventTimeObj;
    }

    get _paidHolidayResult() {
        return this.paidHolidayResult;
    }

    setPaidHolidayResult(eventTimeObj: EventTimeModel) {
        this.paidHolidayResult = eventTimeObj;
    }

    get _driveAndOtherAndPaidHolidaysResult() {
        return this.driveAndOtherAndPaidHolidaysResult;
    }

    setDriveAndOtherAndPaidHolidaysResult(eventTimeObj: EventTimeModel) {
        this.driveAndOtherAndPaidHolidaysResult = eventTimeObj;
    }
}

