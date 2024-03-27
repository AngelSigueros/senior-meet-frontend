# senior-meet-frontend
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Author } from '../model/author.model';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [HttpClientModule, RouterLink, ReactiveFormsModule],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.css'
})
export class AuthorFormComponent implements OnInit {

  authorForm = new FormGroup({
    fullName: new FormControl('')
  });
  photoFile: File | undefined;
  photoPreview: string | undefined;
  author: Author | undefined;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {

  }
  onFileChange(event: Event) {
    let target = event.target as HTMLInputElement; // este target es el input de tipo file donde se carga el archivo

    if(target.files === null || target.files.length == 0){
      return; // no se procesa ningún archivo
    }

    this.photoFile = target.files[0]; // guardar el archivo para enviarlo luego en el save()

    // OPCIONAL: PREVISUALIZAR LA IMAGEN POR PANTALLA
    let reader = new FileReader();
    reader.onload = event => this.photoPreview = reader.result as string;
    reader.readAsDataURL(this.photoFile);
  }

  save() {

    // Crear FormData
    let formData = new FormData();
    // introducir el photoFile
    if(this.photoFile){
      formData.append("photo", this.photoFile);
    }

    // Introducir los datos del author
      formData.append('fullName', this.authorForm.get('fullName')?.value ?? '')

    // http client post para enviar el formData a backend
    console.log(formData);

    this.httpClient.post<Author>('http://localhost:8080/authors', formData)
    .subscribe(author => {
      this.photoFile = undefined;
      this.photoPreview = undefined;
      console.log(author);
      this.author = author;

    });
  }

}



html hobbyForm



<form [formGroup]="hobbyForm" (ngSubmit)="save()">

  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="name"
    placeholder="Indica tu hobby" formControlName="name">
    <label for="name">Titulo del hobby</label>
  </div>

  <div class="form-floating mb-3">
      <input type="text" class="form-control" id="description"
      placeholder="Describe tu hobby" formControlName="description">
      <label for="description">Descripción del hobby</label>
    </div>

    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="photoUrl"
      placeholder="Fotografía del hobby" formControlName="photoUrl">
      <label for="photoUrl">Fotografía del hobby</label>
    </div>
  

    <!--
    <select class="form-select form-select-lg mb-3" formControlName="category">
      <option selected>Open this select menu</option>
      <option value="category1">category1</option>
      <option value="category2">category2</option>
      <option value="category3">category2</option>
    </select>


   
    <select class="form-select form-select-lg mb-3" formControlName="topics" multiple>
      <option selected>Open this select menu</option>
      <option value="topic1">topic1</option>
      <option value="topic2">topic2</option>
      <option value="topic3">topic3</option>
      <option value="topic4">topic4</option>
      <option value="topic5">topic5</option>
    </select>

-->

      <button class="btn btn-success" type="submit">Enviar</button>

  </form>


