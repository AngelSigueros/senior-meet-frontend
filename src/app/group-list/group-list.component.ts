import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { AuthenticationService } from '../user-authentication/authentication.service';

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
  isAdmin: Boolean = false;

  constructor (private http: HttpClient, private router: Router, private authService:AuthenticationService){
    this.authService.isAdmin.subscribe(isAdmin=>this.isAdmin=isAdmin);
  }
  
  loadGroups(){
    this.http.get<User>("http://localhost:8080/user/account").subscribe(u => this.currentUser=u);

    this.http.get<Group[]>("http://localhost:8080/groups").subscribe(g=>this.groups=g);
  }

  ngOnInit(): void {
    console.log('GroupListComponent');

    this.loadGroups();
  }
  addGroupToUser(group: Group) {
    if (this.currentUser) {
      this.http.post('http://localhost:8080/user/' + this.currentUser.id + '/groups/' + group.id, '').subscribe(s => {
        //this.router.navigate(['/groups']);
        this.loadGroups();
      });
    } else {
      // Manejar el caso en el que this.currentUser es undefined
      console.error('Error: currentUser is undefined');
    }
   }

   removeGroupFromUser(group: Group){
    if (this.currentUser) {
      this.http.delete('http://localhost:8080/user/' + this.currentUser.id + '/groups/' + group.id).subscribe(s => {
        //this.router.navigate(['/groups']);
        this.loadGroups();
      });
    } else {
      // Manejar el caso en el que this.currentUser es undefined
      console.error('Error: currentUser is undefined');
    }
   }

   isGroupFromUser(group:Group):boolean{
    if (this.currentUser){
      return group.users.includes(this.currentUser);
    }
    return false;
   }

   isMember(group: Group): boolean {
    if (this.currentUser && this.currentUser.groups) {
   
      //return this.currentUser.groups.includes(group);

      return this.currentUser.groups.some(grupo => grupo.id === group.id);
    } else {
      return false;
    }
  }

  deleteGroup(groupId: number){
    const url = "http://localhost:8080/groups/"+groupId;
    this.http.delete<Boolean>(url).subscribe(b => {
      this.loadGroups();
    });
  }

}
