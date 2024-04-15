import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Interaction } from '../models/interaction.model';
import { Comment } from '../models/comment.model';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit{

  post: Post | undefined
  posts: any
  comments: Comment[]=[]
  interactions: Interaction[]= []
  currentUser: User | undefined

  commentForm = this.fb.group({
    id: [0],
    content: ['', Validators.required],
    user: new FormControl(),
    date: new Date()
  });

  constructor (private fb:FormBuilder, private http: HttpClient, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    console.log('PostDetailComponent');
    
    this.activatedRoute.params.subscribe(params => {
      this.http.get<Post>("http://localhost:8080/post/" +
      params['id']).subscribe(p => {this.post=p;
        console.log(this.post);
    });

    this.http.get<Comment[]>("http://localhost:8080/post/"+params['id']+"/comments").subscribe(c=>this.comments=c);
    this.http.get<Interaction[]>("http://localhost:8080/post/"+params['id']+"/interactions").subscribe(i=>this.interactions=i);
    this.http.get<User>('http://localhost:8080/user/current-user').subscribe( u => {this.currentUser = u});

  });

  }

  save(){
    const id = this.commentForm.get('id')?.value?? 0;
    const content = this.commentForm.get('content')?.value?? 'Contenido comentario';
    const user = this.commentForm.get('user')?.value?? this.currentUser;
    const date = this.commentForm.get('date')?.value?? new Date();

   
    const commentToSave: Comment = {
      id: id,
      content: content,
      user: user,
      date: date
    }

   const url1 = 'http://localhost:8080/comment';
     
    this.http.post<Comment>(url1, commentToSave).subscribe(comment => {
      const url2 = 'http://localhost:8080/post/'+this.post?.id+"/add-comment/"+comment?.id;
      this.http.post<Post>(url2,this.post ).subscribe(p=> console.log(p));
    });

    
  }
}
