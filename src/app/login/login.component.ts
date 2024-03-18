import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../models/login.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  save() {
    const login: Login = {
      email: this.loginForm.get('email')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? '',
    }
    console.log(login);

    const url = 'http://localhost:8080/auth/login';
    this.httpClient.post<any>(url, login).subscribe(response => console.log(response));


  }
}