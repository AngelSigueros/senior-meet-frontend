import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {

  postForm = this.fb.group({
    id: [0],
    title: [''],
    content: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient){}

  save(){
    console.log("Guardando Post");

    // Extraer los valores de cada input escritos por el usuario
    const id = this.postForm.get('id')?.value ?? 0;
    const title= this.postForm.get('title')?.value ?? 'Title';
    const content = this.postForm.get('content')?.value ?? 'Contenido Post';

    // Crear un objeto utilizando los valores extraídos

    const postToSave: Post = {
      id: id,
      title: title,
      content: content
    }
    console.log(postToSave);

    // enviar el objeto a backend utilizando HttpClient
    // const url = 'http://localhost:8080/post;
    // this.httpClient.post<Post>(url, postToSave).subscribe(post => console.log(post));
  }
}
