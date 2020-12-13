import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { RequestUserModel } from '../models/request/request-user.model';

@Injectable({
    providedIn: 'root'
})
export class APIAuthenticationService {

    constructor(
        private firebaseAuthService: AngularFireAuth
    ) {}

    login(loginUser: RequestUserModel) {
        return this.firebaseAuthService.signInWithEmailAndPassword(loginUser.email, loginUser.password);
    }

    logout() {
        return this.firebaseAuthService.signOut();
    }

    isAuthenticated() {
        return this.firebaseAuthService.user;
    }

    getCurrentLoggedInUser() {
        return this.firebaseAuthService.currentUser;
    }

}
