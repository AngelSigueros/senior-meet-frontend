import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Hobby } from '../models/hobby.model';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-hobby-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hobby-detail.component.html',
  styleUrl: './hobby-detail.component.css'
})
export class HobbyDetailComponent implements OnInit{

  group: Hobby|undefined
  hobby!: Hobby;
 

  constructor (private http: HttpClient, private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
   console.log('HobbyDetailComponenet');

   this.activatedRoute.params.subscribe(params=> {
    this.http.get<Hobby>("http://localhost:8080/hobbies/" + params['id']).subscribe(g=>{
      this.hobby=g;
      console.log(this.hobby);
    })
   })
  }


}
 {

}


