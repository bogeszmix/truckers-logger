import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartType } from 'chart.js';
import { ObWorkTimeModel } from 'src/app/api/models/ob-work-time.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParseMinToHM } from '../../../utils/parse-min-to-hm';
import * as moment from 'moment';
import { EditObWorkTimesComponent } from '../modals/edit-ob-work-times/edit-ob-work-times.component';

@Component({
  selector: 'app-work-times-item',
  templateUrl: './work-times-item.component.html',
  styleUrls: ['./work-times-item.component.scss']
})
export class WorkTimesItemComponent implements OnInit, OnChanges {

  @Input() monthData: ObWorkTimeModel;

  timeData: any;

  barChartOptions = {};

  barChartLabels = [];

  barChartData = [];

  barChartType: ChartType;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.createChart();
    this.initChartData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.monthData) {
      this.timeData = {
        date: moment(this.monthData.date).add(-1, 'M').format('YYYY MMMM'),
        difference: ParseMinToHM.parseMinutesToHourMinFormat(this.monthData.obWorkTime - this.monthData.currentWorkTime),
        obTime: ParseMinToHM.parseMinutesToHourMinFormat(this.monthData.obWorkTime),
        currentTime: ParseMinToHM.parseMinutesToHourMinFormat(this.monthData.currentWorkTime)
      };
    }
  }

  createChart() {
    this.barChartType = 'bar';
    this.barChartOptions = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '%'
          },
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 25,
            max : 100
          }
        }]
      },
      maintainAspectRatio : false,
      scaleShowVerticalLines: false,
      responsive: true
    };
  }

  initChartData() {
    this.barChartLabels = [moment(this.monthData.date).add(-1, 'M').format('MMM')];
    this.barChartData = [
      {data: [Math.round( (this.monthData.currentWorkTime / this.monthData.obWorkTime) * 100) ], label: this.barChartLabels}
    ];
  }

  editMonth(mData: ObWorkTimeModel) {
    const monthModalRef = this.modalService.open(EditObWorkTimesComponent);
    if (mData) {
      monthModalRef.componentInstance.data = mData;
    }

    monthModalRef.result.then((resultData: any) => {
      if (resultData) {
        this.timeData.obTime = resultData.workTime;
      }
    });
  }

}
