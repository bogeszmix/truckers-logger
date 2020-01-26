import { Component, OnInit } from '@angular/core';

import { Chart, ChartType } from 'chart.js';

@Component({
  selector: 'app-work-times-item',
  templateUrl: './work-times-item.component.html',
  styleUrls: ['./work-times-item.component.scss']
})
export class WorkTimesItemComponent implements OnInit {

  barChartOptions = {};

  barChartLabels = [];

  barChartData = [];

  barChartType: ChartType;

  constructor() { }

  ngOnInit() {
    this.createChart();
    this.initChartData();
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
    this.barChartLabels = ['Január'];
    this.barChartData = [
      {data: [75], label: 'Január'}
    ];
  }



}
