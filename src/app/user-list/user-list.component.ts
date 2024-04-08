import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../user-authentication/authentication.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[]=[];
  isLoggedIn = false;
  userEmail = '';
  isAdmin = false;

  constructor(private authService: AuthenticationService,
    private http: HttpClient,
    private router: Router) {
    this.authService.isLoggedIn.subscribe(isLoggedIn=>this.isLoggedIn=isLoggedIn);
    this.authService.userEmail.subscribe(userEmail=>this.userEmail=userEmail);
    this.authService.isAdmin.subscribe(isAdmin=>this.isAdmin=isAdmin);
  }

  ngOnInit(): void {
    console.log('UserListComponent');

    this.http.get<User[]>("http://localhost:8080/user").subscribe(u=>this.users=u);
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/user-login']);
  }

}
