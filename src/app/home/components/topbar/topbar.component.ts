import { Component, OnInit, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, AfterContentInit {

  private sidebarStatus = new BehaviorSubject<boolean>(true);

  @Output() isToggled = new EventEmitter<Observable<boolean>>();
  private isSidebarOpen = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  ngAfterContentInit(): void {
    this.isToggled.emit(this.sidebarStatus);

  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarStatus.next(this.isSidebarOpen);
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigateByUrl('/auth/login'));
  }

}
