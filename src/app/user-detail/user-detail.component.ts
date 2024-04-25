import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../user-authentication/authentication.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
  isAdmin = false;
  //errorMessage = '';

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.isAdmin.subscribe((isAdmin) => (this.isAdmin = isAdmin));
  }

  ngOnInit(): void {
    console.log('UserDetailComponent');

    this.activatedRoute.params.subscribe((params) => {
      this.http
        .get<User>('http://localhost:8080/user/' + params['id'])
        .subscribe({
          next: (u) => {
            this.user = u;
            //console.log(this.user);
            //this.router.navigate(['/home']);
          },
          error: (response) => {
            //console.log(response.error);
            //this.errorMessage = response.error;
            this.router.navigate(['/not-found']);
          },
        });
    });
  }
}
