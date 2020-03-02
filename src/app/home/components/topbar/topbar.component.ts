import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Output() isToggled = new EventEmitter<boolean>();
  private isSidebarOpen = true;

  constructor() { }

  ngOnInit() {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isToggled.emit(this.isSidebarOpen);
  }

}
