import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Hobby} from '../models/hobby.model';

@Component({
  selector: 'app-hobby-form',
  standalone: true,
  imports: [HttpClientModule, RouterLink, ReactiveFormsModule],
  templateUrl: './hobby-form.component.html',
  styleUrl: './hobby-form.component.css'
})
export class HobbyFormComponent implements OnInit {

  hobbyForm = new FormGroup({
    fullName: new FormControl('')
  });
  photoFile: File | undefined;
  photoPreview: string | undefined;
  hobby: Hobby | undefined;

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
      formData.append('fullName', this.hobbyForm.get('fullName')?.value ?? '')

    // http client post para enviar el formData a backend
    console.log(formData);

    this.httpClient.post<Hobby>('http://localhost:8080/hobbies', formData)
    .subscribe(hobby => {
      this.photoFile = undefined;
      this.photoPreview = undefined;
      console.log(hobby);
      this.hobby = hobby;
    });
  }

}
