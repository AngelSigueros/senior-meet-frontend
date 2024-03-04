import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

  user: User | undefined;

  constructor (private http: HttpClient, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('UserDetailComponent');

    this.activatedRoute.params.subscribe(params=> {
      this.http.get<User>("http://localhost:8080/user/"+params['id']).subscribe(u=>{
        this.user=u;
        console.log(this.user);
    });
        
    });
  }

}
