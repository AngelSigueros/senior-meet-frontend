import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Hobby } from '../models/hobby.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-hobby-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './hobby-form.component.html',
  styleUrl: './hobby-form.component.css'
})
export class HobbyFormComponent {

  hobbyForm = this.fb.group({
    id: [0],
    name: [''],
    description: [''],
    photoUrl: ['']
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  save() {
    console.log("Guardando hobby");

    // Extraer los valores de cada input escritos por el usuario
    const id = this.hobbyForm.get('id')?.value ?? 0;
    const name= this.hobbyForm.get('name')?.value ?? 'Hobby';
    const description = this.hobbyForm.get('description')?.value ?? 'Descripción Hobby';
    const photoUrl = this.hobbyForm.get('photoUrl')?.value ?? '';
    // Crear un objeto utilizando los valores extraídos

    const hobbyToSave: Hobby = {
      id: id,
      name: name,
      description: description,
      photoUrl: photoUrl

    }
    console.log(hobbyToSave);

    // enviar el objeto a backend utilizando HttpClient
    // const url = 'http://localhost:8080/hobbies;
    // this.httpClient.post<Hobby>(url, hobbyToSave).subscribe(hobby => console.log(hobby));
  }
}
