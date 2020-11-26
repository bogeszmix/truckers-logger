import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  sidebarStatusSub: Subscription;
  isOpened: boolean;

  @ViewChild('toggableSidebar') toggableSidebar: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.sidebarStatusSub) {
      this.sidebarStatusSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    if (this.toggableSidebar) {
      this.addToggle();
    }
  }

  isSidebarOpened(event: Observable<boolean>) {
    this.sidebarStatusSub = event.subscribe((status: boolean) => {
      if (this.toggableSidebar) {
        if (status) {
          this.addToggle();
        } else {
          this.removeToggle();
        }
      }
    });
  }

  addToggle() {
      this.renderer.addClass(this.toggableSidebar.nativeElement.querySelector('.sidebar'), 'toggled');
  }

  removeToggle() {
      this.renderer.removeClass(this.toggableSidebar.nativeElement.querySelector('.sidebar'), 'toggled');
  }
}
