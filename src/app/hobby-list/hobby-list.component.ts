import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Hobby } from '../models/hobby.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hobby-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './hobby-list.component.html',
  styleUrl: './hobby-list.component.css'
})
export class HobbyListComponent implements OnInit{
  hobbies: Hobby[]=[];

  constructor (private http: HttpClient) {}

  ngOnInit(): void {
    console.log('HobbyListComponent');

    this.http.get<Hobby[]>("http://localhost:8080/hobbies").subscribe(h=>this.hobbies=h);
  }
}



