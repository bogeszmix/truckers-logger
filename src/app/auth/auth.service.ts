import { Injectable } from '@angular/core';
import { APIAuthenticationService } from '../api/services/api-authentication.service';
import { RequestUserModel } from '../api/models/request/request-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiAuthService: APIAuthenticationService
  ) { }

  login(loginUser: RequestUserModel) {
    return this.apiAuthService.login(loginUser);
  }

  logout() {
    return this.apiAuthService.logout();
  }

  isAuthenticated() {
    return this.apiAuthService.isAuthenticated();
  }

  getCurrentLoggedInUser() {
    return this.apiAuthService.getCurrentLoggedInUser();
  }
}
