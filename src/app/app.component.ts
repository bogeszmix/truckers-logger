import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ɵangular_packages_platform_browser_platform_browser_l } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'truckers-logger';

  ngOnInit() {
    moment.locale(navigator.language);
  }
}
