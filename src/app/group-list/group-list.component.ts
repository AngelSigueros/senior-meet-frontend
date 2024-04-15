import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css'
})
export class GroupListComponent implements OnInit{


  groups: Group[] = []

  constructor (private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    console.log('GroupListComponent');

    this.http.get<Group[]>("http://localhost:8080/groups").subscribe(g=>this.groups=g);
  }
  addGroupToUser(group: Group) {
    this.http.get('http://localhost:8080/user/add-group/' + group.id).subscribe(user => {
      // navegar al detalle del grupo
      this.router.navigate(['/groups', group.id, 'detail']);
   });
   }

}
