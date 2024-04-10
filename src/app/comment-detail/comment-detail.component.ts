import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment-detail',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './comment-detail.component.html',
  styleUrl: './comment-detail.component.css'
})
export class CommentDetailComponent implements OnInit{
  comment: Comment | undefined
  comments: any;

  constructor (private http: HttpClient, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    console.log('CommentDetailComponent');

    this.activatedRoute.params.subscribe(params=> {
      this.http.get<Comment>("http://localhost:8080/comment/" + params['id']).subscribe(c=>{
        this.comment=c;
        console.log(this.comment);
      })
     })
  }

}
