import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  userForm: FormGroup;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      photo: [null, Validators.required],
    });
  }

  onFileSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    // this.userForm.patchValue({ image: file });

    console.log('onFileSelected');

    // Primero, asegúrate de que el evento tiene un target y que este target es un input de tipo archivo
    const input = event.target as HTMLInputElement;
    // Luego, verifica que el input tenga archivos seleccionados antes de intentar acceder al primer archivo
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('file '+ file);
      this.userForm.patchValue({ photo: file });
      // Asegúrate también de llamar a updateValueAndValidity para actualizar el estado de validación del formulario
      this.userForm.get('photo')?.updateValueAndValidity();
    }
  }

  uploadUser() {
    console.log('uploadUser');
    // if (this.userForm.valid) {
      let uploadUrl = 'http://localhost:8080/user';

      console.log('uploadUrl '+ uploadUrl);

      const formData = new FormData();
      //formData.append('firstName', this.userForm.get('firstName')?.value);
      //formData.append('email', this.userForm.get('email')?.value);
      formData.append('photo', this.userForm.get('photo')?.value);

      console.log('formData '+ formData);

      this.http.post(uploadUrl, formData).subscribe(
        (response) => console.log('Upload successful', response),
        (error) => console.error('Error:', error)
      );
    // }
  }

  ngOnInit(): void {
    console.log('UserProfileComponent');

    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id']);
      this.http
        .get<User>('http://localhost:8080/user/' + params['id'])
        .subscribe((u) => {
          this.user = u;
          console.log(this.user);
        });
    });
  }
}
