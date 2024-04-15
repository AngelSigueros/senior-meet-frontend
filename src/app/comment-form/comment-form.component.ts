import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit {

  comments : Comment[] = []
  currentUser: User | undefined

  postForm = this.fb.group({
    id: [0],
    content: ['',Validators.required],
    user: new FormControl(),
    date: new Date()
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient){}
  
  ngOnInit(): void {
    this.httpClient.get<User>('http://localhost:8080/user/account').subscribe( u => {this.currentUser = u});
  }


  save(){
    const id = this.postForm.get('id')?.value ?? 0;
    const content = this.postForm.get('content')?.value ?? 'Content';
    const user = this.postForm.get('user')?.value?? this.currentUser;
    const date = this.postForm.get('date')?.value ?? new Date();

    const commentToSave: Comment = {
      id: id,
      content: content,
      user: user,
      date: date
    }
    console.log(commentToSave);

    const url = 'http://localhost:8080/comment';
    this.httpClient.post<Comment>(url, commentToSave).subscribe(comment => console.log(comment));
  }

}
