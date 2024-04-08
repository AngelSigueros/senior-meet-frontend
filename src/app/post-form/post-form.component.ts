import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../models/post.model';
import { Group} from '../models/group.model';
import { User } from '../models/user.model';
import { Interaction } from '../models/interaction.model';


@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit {

  groups: Group[]=[];

  postForm = this.fb.group({
    id: [0],
    content: ['', Validators.required],
    photoUrl:[''],
    videoUrl: [''],
    group: new FormControl(),
    user: new FormControl(),
    interactions: [[]],
    comments: [[]]
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient){}

  ngOnInit(): void {
    this.httpClient.get<Group[]>("http://localhost:8080/groups").subscribe(g=>this.groups=g);
  }

  save(){
    console.log("Guardando Post");

    // Extraer los valores de cada input escritos por el usuario
    const id = this.postForm.get('id')?.value ?? 0;
    const content = this.postForm.get('content')?.value ?? 'Contenido Post';
    const photoUrl = this.postForm.get('photoUrl')?.value ?? 'Photo url';
    const videoUrl = this.postForm.get('videoUrl')?.value ?? 'Video url';
    const group = this.postForm.get('group')?.value  ;
    const user = this.postForm.get('user')?.value ;
    const interactions = this.postForm.get('interactions')?.value ?? [];
    const comments = this.postForm.get('comments')?.value ?? [];

    // Crear un objeto utilizando los valores extraídos

    const postToSave: Post = {
      id: id,
      content: content,
      photoUrl: photoUrl,
      videoUrl: videoUrl,
      group: group,
      user: user,
      interactions: interactions,
      comments: comments
    }
    console.log(postToSave);

    // enviar el objeto a backend utilizando HttpClient
    // const url = 'http://localhost:8080/post;
    // this.httpClient.post<Post>(url, postToSave).subscribe(post => console.log(post));
  }
}
