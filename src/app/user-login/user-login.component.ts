import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../user-authentication/authentication.service';
import { Router } from '@angular/router';
import { Login } from '../models/login.dto';
import { Token } from '../models/token.dto';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required], //, Validators.minLength(8), Validators.maxLength(12)]
  });

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  save() {
    const login: Login = {
      email: this.loginForm.get('email')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? '',
    };

    const url = 'http://localhost:8080/user/login';
    this.httpClient.post<Token>(url, login).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/users']);
      },
      error: (response) => {
        console.log(response);
        this.errorMessage = response.error;
      },
    });
  }
}
