import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hobbies',
  standalone: true,
  imports: [],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.css'
})
export class HobbiesComponent implements OnInit{

  constructor (private https: HttpClient, private activateRoute: ActivatedRoute){}
ngOnInit(): void {
  throw new Error('Method not implemented.');
}

hobbies: HobbiesComponent|undefined;


}
