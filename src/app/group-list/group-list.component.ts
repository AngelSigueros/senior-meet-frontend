import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css'
})
export class GroupListComponent implements OnInit{

  groups: Group[] = []

  constructor (private http: HttpClient){}

  ngOnInit(): void {
    console.log('GroupListComponent');

    this.http.get<Group[]>("http://localhost:8080/groups").subscribe(g=>this.groups=g);
  }


}
