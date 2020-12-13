import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RequestUserModel } from '../api/models/request/request-user.model';
import { APIAuthenticationService } from '../api/services/api-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentLoggedInUser: firebase.default.User;

  constructor(
    private apiAuthService: APIAuthenticationService
  ) { }

  get _currentLoggedInUser() {
    return this.currentLoggedInUser ? this.currentLoggedInUser : null;
  }

  set _setCurrentLoggedInUser(user: firebase.default.User) {
    this.currentLoggedInUser = user;
  }

  login(loginUser: RequestUserModel) {
    return this.apiAuthService.login(loginUser);
  }

  logout() {
    return this.apiAuthService.logout();
  }

  isAuthenticated() {
    return this.apiAuthService.isAuthenticated().pipe(
      tap((loggedInUser: firebase.default.User) => this._setCurrentLoggedInUser = loggedInUser)
    );
  }
}
