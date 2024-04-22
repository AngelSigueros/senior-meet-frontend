import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { Group } from '../models/group.model';
import { Post } from '../models/post.model';
import { Hobby } from '../models/hobby.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  user: User | undefined;
  photoFile: File | undefined;
  photoPreview: string | undefined;
  isUpdate: boolean = false; // por defecto estamos en CREAR no en ACTUALIZAR
  //groups: Group[] = []; // array de grupos
  //hobbies: Hobby[] = [];
  //posts: Post[] = [];

  userForm = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>(''),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]{9}$')]),
    codigoPostal: new FormControl<string>('', Validators.pattern('^[0-9]{5}$')),
    ciudad: new FormControl<string>(''),
    sexo: new FormControl<string>(''),
    fechaNacimiento: new FormControl<Date>(new Date(), Validators.required),
    available: new FormControl<boolean>(false),
    photoUrl: new FormControl(''),
    //userRole: new FormControl(),
    //groups: new FormControl(),
    //hobbies: new FormControl(),
    //posts: new FormControl(),
  });

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // cargar grupos, hobbies, posts de backend para los combos en el formulario
    //this.httpClient.get<Author[]>('http://localhost:8080/user/posts/' + id)
    //.subscribe(authors => this.authors = authors);

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;

      console.log(this.user);

      this.httpClient.get<User>('http://localhost:8080/user/'+id).subscribe(user => {
          console.log(user);
          
          this.isUpdate = true;
          console.log(this.isUpdate)
          this.user = user;
          this.userForm.reset(user);
          
        });
    });
  }

  onFileChange(event: Event) {
    let target = event.target as HTMLInputElement; // este target es el input de tipo file donde se carga el archivo

    if (target.files === null || target.files.length == 0) {
      return; // no se procesa ningún archivo
    }

    this.photoFile = target.files[0]; // guardar el archivo para enviarlo luego en el save()

    // OPCIONAL: PREVISUALIZAR LA IMAGEN POR PANTALLA
    let reader = new FileReader();
    reader.onload = (event) => (this.photoPreview = reader.result as string);
    reader.readAsDataURL(this.photoFile);
  }

  save() {

    let formData = new FormData();
    formData.append('id', this.userForm.get('id')?.value?.toString() ?? '0');
    formData.append('firstName', this.userForm.get('firstName')?.value ?? '');
    formData.append('lastName', this.userForm.get('lastName')?.value ?? '');
    formData.append('email', this.userForm.get('email')?.value ?? '');
    formData.append('password', this.userForm.get('password')?.value ?? '');
    formData.append('phone', this.userForm.get('phone')?.value?.toString() ?? '');
    formData.append('codigoPostal', this.userForm.get('codigoPostal')?.value?.toString() ?? '');
    formData.append('ciudad', this.userForm.get('ciudad')?.value ?? '');
    formData.append('sexo', this.userForm.get('sexo')?.value ?? '');
    formData.append('fechaNacimiento', this.userForm.get('fechaNacimiento')?.value?.toString() ?? '');
    formData.append('photoUrl', this.userForm.get('photoUrl')?.value ?? '');
    formData.append('available', this.userForm.get('available')?.value?.toString() ?? 'false');
    formData.append('userRole', 'USER');
    //formData.append('groups', this.userForm.get('groups')?.value ?? '');
    //formData.append('hobbies', this.userForm.get('hobbies')?.value ?? '');
    //formData.append('posts', this.userForm.get('posts')?.value ?? '');

    if(this.photoFile) {
      formData.append("photo", this.photoFile);
    }

    console.log(this.isUpdate)
    if (this.isUpdate) {
      const url = 'http://localhost:8080/user/account'; // + this.user?.id;
      this.httpClient.put<User>(url, formData).subscribe((user) => {
        this.router.navigate(['/users', user.id, 'detail']);
      });
    } else {
      const url = 'http://localhost:8080/user/photo';
      this.httpClient.post<User>(url, formData).subscribe((user) => {
        this.router.navigate(['/users', user.id, 'detail']);
      });
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    }
    return o1 === o2;
  }
}
