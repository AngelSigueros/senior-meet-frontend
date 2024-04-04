import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem("jwt_token", token);
    this.isLoggedIn.next(true);
  }
}
