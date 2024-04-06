import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  userForm = new FormGroup({
    id: new FormControl<number>(0),
    title: new FormControl<string>(''),
    isbn: new FormControl<string>(''),
    price: new FormControl<number>(0.0),
    publishDate: new FormControl<Date>(new Date()),
    available: new FormControl<boolean>(false),
    author: new FormControl(),
    editorial: new FormControl()
  });

  isUpdate: boolean = false; // por defecto estamos en CREAR no en ACTUALIZAR
  authors: Author[] = []; // array de autores para asociar un autor al libro
  editorials: Editorial[] = [];

  constructor(
      private fb: FormBuilder,
      private httpClient: HttpClient,
      private router: Router,
      private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
      // cargar autores de backend para el selector de autores en el formulario
      this.httpClient.get<Author[]>('https://fullstack-byvu.onrender.com/api/authors')
      .subscribe(authors => this.authors = authors);

      this.httpClient.get<Editorial[]>('https://fullstack-byvu.onrender.com/api/editorials')
      .subscribe(editorials => this.editorials = editorials);

      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
        if(!id) return;

        this.httpClient.get<Book>('https://fullstack-byvu.onrender.com/api/books/' + id).subscribe(bookFromBackend => {
          // cargar el libro obtenido en el formulario bookForm
          this.userForm.patchValue(bookFromBackend);
          this.isUpdate = true;
        });
      });
    }

    save () {
      const book: Book = this.userForm.value as Book;
      console.log(book);

      if (this.isUpdate) {
        const url = 'https://fullstack-byvu.onrender.com/api/books/' + book.id;
        this.httpClient.put<Book>(url, book).subscribe(bookFromBackend => {
          this.router.navigate(['/books', bookFromBackend.id, 'detail']);
        });

      } else {
        const url = 'https://fullstack-byvu.onrender.com/api/books';
        this.httpClient.post<Book>(url, book).subscribe(bookFromBackend => {
          this.router.navigate(['/books', bookFromBackend.id, 'detail']);
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
