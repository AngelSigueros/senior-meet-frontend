import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css'
})
export class GroupListComponent implements OnInit{


  groups: Group[] = []
  currentUser: User|undefined

  constructor (private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    console.log('GroupListComponent');

    this.http.get<User>("http://localhost:8080/user/account").subscribe(u => this.currentUser=u);

    this.http.get<Group[]>("http://localhost:8080/groups").subscribe(g=>this.groups=g);
  }
  addGroupToUser(group: Group) {
    if (this.currentUser) {
      this.http.post('http://localhost:8080/user/' + this.currentUser.id + '/groups/' + group.id, '').subscribe(s => {
        this.router.navigate(['/groups', group.id, 'detail']);
      });
    } else {
      // Manejar el caso en el que this.currentUser es undefined
      console.error('Error: currentUser is undefined');
    }
   }

}
