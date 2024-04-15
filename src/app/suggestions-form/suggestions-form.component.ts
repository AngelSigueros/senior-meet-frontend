import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Suggestions } from '../models/suggestions.model';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-suggestions-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgbAlertModule],
  templateUrl: './suggestions-form.component.html',
  styleUrl: './suggestions-form.component.css'
})
export class SuggestionsFormComponent implements OnInit {
  suggestionsForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    description: new FormControl(''),

  });

  suggestions: Suggestions | undefined;
  showConfirmMessage = false;

  constructor(private httpClient: HttpClient, 
              private router: Router) { }

  ngOnInit(): void {

  }

  save() {

    // Crear FormData
    //let formData = new FormData();
    const suggestion: Suggestions = this.suggestionsForm.value as Suggestions;

    // Introducir los datos del del cliente
    // formData.append('description', this.suggestionsForm.get('description')?.value ?? '')
    // formData.append('name', this.suggestionsForm.get('name')?.value ?? '')

    // http client post para enviar el formData a backend
    console.log(suggestion);

    this.httpClient.post<Suggestions>('http://localhost:8080/suggestions', suggestion)
      .subscribe(suggestions => {
        //this.id = undefined;
        //this.name = undefined;
        console.log(suggestions);
        this.suggestions = suggestions;
        this.showConfirmMessage = true;
        //this.router.navigate(['/home']);
        this.showConfirmMessage = true;
        //this.router.navigate(['/home']);
      });
  }
}
