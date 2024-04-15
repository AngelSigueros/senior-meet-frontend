import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Group } from '../models/group.model';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.css'
})
export class GroupFormComponent {
  groupForm = this.fb.group({
    id: [0],
    title: [''],
    description: [],
    photoUrl: [],
    rules: [],

  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  save() {

    console.log("Guardando grupo");

    // Extraer los valores de cada input escritos por el usuario
    const id = this.groupForm.get('id')?.value ?? 0;
    const title = this.groupForm.get('title')?.value ?? 'titulo por defecto';
    const description= this.groupForm.get('description')?.value ??'description';
    const photoUrl= this.groupForm.get('photoUrl')?.value ?? 'foto';
    const rules= this.groupForm.get('rules')?.value ?? 'Reglas';

    // Crear un objeto utilizando los valores extraídos
    const groupToSave: Group = {
      id: id,
      title: title,
      description: description,
      photoUrl: photoUrl,
      rules: rules,
      users: []
    }
    console.log(groupToSave);
  }
}



  

