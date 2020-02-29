import { Injectable } from '@angular/core';
import { ObWorkTimeModel } from 'src/app/api/models/ob-work-time.model';
import { BehaviorSubject } from 'rxjs';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ObWorkTimesService {

  private mockWorkTimes: ObWorkTimeModel[] = [
    {
      id: '1',
      date: new NgbDate(2020, 1, 1),
      obWorkTime: 9840,
      currentWorkTime: 5250
    },
    {
      id: '2',
      date: new NgbDate(2020, 2, 1),
      obWorkTime: 2085,
      currentWorkTime: 1285
    },
    {
      id: '3',
      date: new NgbDate(2020, 3, 1),
      obWorkTime: 1000,
      currentWorkTime: 1285
    }
  ];

  obWorkTimes = new BehaviorSubject<ObWorkTimeModel[]>(this.mockWorkTimes);

  constructor() { }

  get _obWorkTimes() {
    return this.obWorkTimes.asObservable();
  }

  addNewMonth(newMonth: ObWorkTimeModel) {
    if (newMonth) {
      const temp = [...this.mockWorkTimes];
      temp.push(newMonth);
      this.mockWorkTimes = temp;
      this.obWorkTimes.next(temp);
    }
  }

  modifyObWorkTime(editableMonth: ObWorkTimeModel) {
    if (editableMonth) {
      const temp = [...this.mockWorkTimes];
      temp.forEach((item: ObWorkTimeModel) => {
        if (item.id === editableMonth.id) {
          item.obWorkTime = editableMonth.obWorkTime;
        }
      });
      this.mockWorkTimes = temp;
      this.obWorkTimes.next(temp);
    }
  }
}
