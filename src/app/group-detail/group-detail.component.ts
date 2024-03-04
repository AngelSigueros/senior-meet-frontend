import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css'
})
export class GroupDetailComponent implements OnInit{

  group: Group |undefined

  constructor (private http: HttpClient, private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
   console.log('GroupDetailComponenet');

   this.activatedRoute.params.subscribe(params=> {
    this.http.get<Group>("http://localhost:8080/grops/" + params['id']).subscribe(g=>{
      this.group=g;
      console.log(this.group);
    })
   })
  }


}
