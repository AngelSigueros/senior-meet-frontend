import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Interaction } from '../models/interaction.model';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit{

  post: Post | undefined
  posts: any
  comments: Comment[]=[]
  interactions: Interaction[]= []

  constructor (private http: HttpClient, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    console.log('PostDetailComponent');
    
    this.activatedRoute.params.subscribe(params => {
      this.http.get<Post>("http://localhost:8080/post/" +
      params['id']).subscribe(p => {this.post=p;
        console.log(this.post);
    });

    this.http.get<Comment[]>("http://localhost:8080/post/"+params['id']+"/comments").subscribe(c=>this.comments=c);
    this.http.get<Interaction[]>("http://localhost:8080/post/"+params['id']+"/interactions").subscribe(i=>this.interactions=i);
  });

  }
}
