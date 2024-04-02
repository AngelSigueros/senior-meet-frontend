import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {

  posts: Post[] = []

  constructor (private http: HttpClient){}

  ngOnInit(): void {
    console.log('PostListComponent');
    this.http.get<Post[]>("http://localhost:8080/posts").subscribe(p=>this.posts=p);
  }

}
