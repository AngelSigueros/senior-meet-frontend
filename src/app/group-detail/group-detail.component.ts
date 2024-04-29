import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { ActivatedRoute} from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css'
})
export class GroupDetailComponent implements OnInit{

  group: Group |undefined
  groups: any;
  currentUser: User|undefined


  constructor (private http: HttpClient, private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
   console.log('GroupDetailComponent');

    this.loadGroupDetail();
  }

  loadGroupDetail(){
    this.http.get<User>("http://localhost:8080/user/account").subscribe(u => this.currentUser=u);

    this.activatedRoute.params.subscribe(params=> {
     this.http.get<Group>("http://localhost:8080/groups/" + params['id']).subscribe(g=>{
       this.group=g;
       console.log(this.group);
     })
    });
  }

  isGroupFromUser(group: Group): boolean {
    if (this.currentUser && this.currentUser.groups) {
      console.log(this.currentUser.groups);
      //return this.currentUser.groups.includes(group);
      return this.currentUser?.groups.some(grupo => grupo.id === group.id);
    } else {
      return false;
    }
  }

  

  removeGroupFromUser(group: Group){

  }

  addGroupToUser(group: Group) {
    if (this.currentUser) {
      this.http.post('http://localhost:8080/user/' + this.currentUser.id + '/groups/' + group.id, '').subscribe(s => {
        //this.router.navigate(['/groups']);
        this.loadGroupDetail();
      });
    } else {
      // Manejar el caso en el que this.currentUser es undefined
      console.error('Error: currentUser is undefined');
    }
   }

}
