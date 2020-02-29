import * as moment from 'moment';

export class ParseMinToHM {
    public static parseMinutesToHourMinFormat(minutes: number): string {
        const defaultResult = '00:00';
        let hours = 0;
        let mins = 0;
        if (!isNaN(minutes) ) {
            hours = Math.abs(Math.trunc(minutes / 60));
            mins = Math.abs(minutes % 60);
        } else {
            return defaultResult;
        }

        if (minutes >= 0) {
            return `${hours >= 10 ? hours : '0' + hours}:${mins >= 10 ? mins : '0' + mins}`;
        }

        if (minutes < 0) {
            return `${hours >= 10 ? '+' + hours : '+0' + hours}:${mins >= 10 ? mins : '0' + mins}`;
        }
    }

    public static parseHourMinToMinutesFormat(hourMin: string): number {
        let result = 0;

        if (hourMin && hourMin.length > 0) {
            const stringArr = hourMin.split(':');
            result += Number(stringArr[0]) * 60;
            result += Number(stringArr[1]);
        }
        return result;
    }
}
