import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../models/post.model';
import { AuthenticationService } from '../user-authentication/authentication.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {

  posts: Post[] = []

  isAdmin: Boolean = false;

  constructor (private authService: AuthenticationService, private http: HttpClient){
    this.authService.isAdmin.subscribe(isAdmin=>this.isAdmin=isAdmin);
  }

  ngOnInit(): void {
    this.loadPosts();
    
  }

  loadPosts(){
    this.http.get<Post[]>("http://localhost:8080/post").subscribe(p=>this.posts=p);
  }

  deletePost(postId: number){
    const url = "http://localhost:8080/post/"+postId;
    this.http.delete<Boolean>(url).subscribe(b => {
      this.loadPosts();
    });
  }

}
