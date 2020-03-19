import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Output() isToggled = new EventEmitter<boolean>();
  private isSidebarOpen = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isToggled.emit(this.isSidebarOpen);
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigateByUrl('/auth/login'))
      .catch(response => console.log(response));
  }

}
