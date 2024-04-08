import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit{

  post: Post | undefined
  posts: any

  constructor (private http: HttpClient, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    console.log('PostDetailComponent');
    this.activatedRoute.params.subscribe(params => {
      this.http.get<Post>("http://localhost:8080/post/" +
      params['id']).subscribe(p => {this.post=p;
        console.log(this.post);
    });
  });

  }
}
