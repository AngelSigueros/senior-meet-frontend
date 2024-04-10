import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Hobby } from '../models/hobby.model';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../user-authentication/authentication.service';

@Component({
  selector: 'app-hobby-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hobby-list.component.html',
  styleUrl: './hobby-list.component.css'
})
export class HobbyListComponent implements OnInit{
  hobbies: Hobby[]=[];
  isAdmin = false;

  constructor (private authService: AuthenticationService,
    private http: HttpClient,
    private router: Router)  {
    this.authService.isAdmin.subscribe(isAdmin=>this.isAdmin=isAdmin);
  }

  ngOnInit(): void {
    console.log('HobbyListComponent');

    this.http.get<Hobby[]>("http://localhost:8080/hobbies").subscribe(h=>this.hobbies=h);
  }
}



