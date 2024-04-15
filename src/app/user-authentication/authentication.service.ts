import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { DecodedToken } from './decoded-token.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = new BehaviorSubject<boolean>(this.existToken());
  userEmail =  new BehaviorSubject<string>(this.getUserEmail());
  isAdmin =  new BehaviorSubject<boolean>(this.getIsAdmin());

  constructor() {}

  getIsAdmin() {
    const token = localStorage.getItem("jwt_token");
    if (!token) return false;
    console.log(jwtDecode(token));
    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken.role === 'ADMIN';
  }

  getUserEmail(): string {
    const token = localStorage.getItem("jwt_token");
    if (!token) return '';
    console.log(jwtDecode(token));
    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken.email;
  }

  existToken() {
    return localStorage.getItem("jwt_token") != null;
  }

  saveToken(token: string) {
    localStorage.setItem("jwt_token", token);
    this.isLoggedIn.next(true);
    this.userEmail.next(this.getUserEmail());
    this.isAdmin.next(this.getIsAdmin());
  }

  removeToken() {
    localStorage.removeItem("jwt_token");
    this.isLoggedIn.next(false);
    this.userEmail.next('');
    this.isAdmin.next(false);
  }
}
