import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Suggestions } from '../models/suggestions.model';

@Component({
  selector: 'app-suggestions-form',
  standalone: true,
  imports: [HttpClientModule, RouterLink, ReactiveFormsModule],
  templateUrl: './suggestions-form.component.html',
  styleUrl: './suggestions-form.component.css'
})
export class SuggestionsFormComponent implements OnInit{
  suggestionsForm = new FormGroup({
id: new FormControl(0),
Name: new FormControl(''),
description: new FormControl(''),

});
  suggestions: Suggestions | undefined;
constructor(private httpClient: HttpClient) {}

ngOnInit(): void {
  
}

save() {

  // Crear FormData
  let formData = new FormData();
  

  // Introducir los datos del del cliente
    formData.append('descripcion', this.suggestionsForm.get('descripcion')?.value ?? '')
    formData.append('name', this.suggestionsForm.get('name')?.value ?? '')

  // http client post para enviar el formData a backend
  console.log(formData);

  this.httpClient.post<Suggestions>('http://localhost:8080/suggestions', formData)
  .subscribe(suggestions => {
    //this.id = undefined;
    //this.name = undefined;
    console.log(suggestions);
    this.suggestions = suggestions;
  });
}
}
