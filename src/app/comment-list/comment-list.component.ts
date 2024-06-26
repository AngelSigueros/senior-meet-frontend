import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit{
  
  comments: Comment[] = []

  constructor(private http: HttpClient){}
  
  ngOnInit(): void {
    console.log('CommentListComponent');

    this.http.get<Comment[]>("http://localhost:8080/comment").subscribe(c=>this.comments=c);
  }

}
