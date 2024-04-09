import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { Group } from '../models/group.model';
import { Post } from '../models/post.model';
import { Hobby } from '../models/hobby.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  user: User | undefined;
  photoFile: File | undefined;
  photoPreview: string | undefined;
  isUpdate: boolean = false; // por defecto estamos en CREAR no en ACTUALIZAR
  groups: Group[] = []; // array de grupos 
  hobbies: Hobby[] = [];
  posts: Post[] = [];

  userForm = new FormGroup({
    id: new FormControl<number>(0),
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    codigoPostal: new FormControl<string>(''),
    ciudad: new FormControl<string>(''),
    sexo: new FormControl(),
    fechaNacimiento: new FormControl<Date>(new Date()),
    photoUrl: new FormControl(),
    available: new FormControl<boolean>(false),
    userRole: new FormControl(),
    groups: new FormControl(),
    hobbies: new FormControl(),
    posts: new FormControl()
  });


  constructor(
      private httpClient: HttpClient,
      private router: Router,
      private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
      // cargar grupos, hobbies, posts de backend para los combos en el formulario
      //this.httpClient.get<Author[]>('http://localhost:8080/user/posts/' + id)
      //.subscribe(authors => this.authors = authors);


      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
        if(!id) return;

        this.httpClient.get<User>('http://localhost:8080/user/' + id).subscribe(user => {
          this.userForm.reset(user);
          this.isUpdate = true;
          this.user = user;
        });
      });
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


    save () {
      const user: User = this.userForm.value as User;
      console.log(user);

      if(this.photoFile) {
        //formData.append("photo", this.photoFile);
      }

      if (this.isUpdate) {
        const url = 'http://localhost:8080/user/' + this.user?.id;
        this.httpClient.put<User>(url, user).subscribe(user => {
          this.router.navigate(['/users', user.id, 'detail']);
        });

      } else {
        const url = 'http://localhost:8080/user';
        this.httpClient.post<User>(url, user).subscribe(user => {
          this.router.navigate(['/users', user.id, 'detail']);
        });
      }
    }


    compareObjects(o1: any, o2: any): boolean {
      if(o1 && o2) {
        return o1.id === o2.id;
      }
      return o1 === o2;
    }
}
