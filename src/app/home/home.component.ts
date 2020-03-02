import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isOpened: boolean;

  @ViewChild('toggableSidebar', { static: false}) toggableSidebar: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  isSidebarOpened(event: boolean) {
    if (event) {
      this.renderer.addClass(this.toggableSidebar.nativeElement.querySelector('.sidebar'), 'toggled');
    } else {
      this.renderer.removeClass(this.toggableSidebar.nativeElement.querySelector('.sidebar'), 'toggled');
    }
  }
}
