import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../models/register.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
})
export class UserRegisterComponent {
  // no necesita FormBuilder:
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
    },
    { validators: this.passwordConfirmValidator } // Validador personalizado que comprueba dos campos al mismo tiempo
  );

  errorMessage = '';
  successMessage = false;

  constructor(private httpClient: HttpClient, private router: Router) {}

  passwordConfirmValidator(control: AbstractControl) {
    if (
      control.get('password')?.value === control.get('passwordConfirm')?.value
    ) {
      return null; // las password coinciden por tanto no hay error devolvemos null
    } else {
      // las password no coinciden devolver un error:
      return {
        confirmError: true,
      };
    }
  }

  save() {
    const register: Register = {
      email: this.registerForm.get('email')?.value ?? '',
      password: this.registerForm.get('password')?.value ?? '',
    };

    // enviar registro a backend
    this.httpClient
      .post('http://localhost:8080/user/register', register)
      .subscribe({
        next: (response) => {
          //limpiar el formulario o redirigir a pantalla de login
          this.registerForm.reset();
          this.successMessage = true;
          //this.router.navigate(['/user-login']);
        },
        error: (response) => {
          console.log(response);
          this.errorMessage = response.error;
        },
      });
  }
}
