import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink , ActivatedRoute, Router} from '@angular/router';
import { Hobby} from '../models/hobby.model';

@Component({
  selector: 'app-hobby-form',
  standalone: true,
  imports: [HttpClientModule, RouterLink, ReactiveFormsModule],
  templateUrl: './hobby-form.component.html',
  styleUrl: './hobby-form.component.css'
})
export class HobbyFormComponent implements OnInit {

  hobbyForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    photoUrl: new FormControl(''),
    description: new FormControl(''),
  });

  photoFile: File | undefined;
  photoPreview: string | undefined;
  hobby: Hobby | undefined;
  isUpdate: boolean = false;

  constructor(
  private httpClient: HttpClient, 
  private activatedRoute: ActivatedRoute,
  private router: Router
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {

      const id = params['id'];

      if(!id) return;

     

 

      this.httpClient.get<Hobby>('http://localhost:8080/hobbies/' + id).subscribe(hobby => {

        this.hobbyForm.reset(hobby);

        this.isUpdate = true;

        this.hobby = hobby;

      });

    });

  }

 

  onFileChange(event: Event) {

    let target = event.target as HTMLInputElement; // este target es el input de tipo file donde se carga el archivo

 

    if(target.files === null || target.files.length == 0){

      return; // no se procesa ningún archivo

    }

 

    this.photoFile = target.files[0];

  }

 

  save(){

    let formData = new FormData();

    formData.append('photoUrl', this.hobbyForm.get('photoUrl')?.value ?? '');

    formData.append('id', this.hobbyForm.get('id')?.value?.toString() ?? '0');

    formData.append('title', this.hobbyForm.get('title')?.value ?? '');

    formData.append('description', this.hobbyForm.get('description')?.value ?? '');

    formData.append('rules', this.hobbyForm.get('rules')?.value ?? '');

 

    console.log(formData)

    if(this.photoFile) {

      formData.append("photo", this.photoFile);

    }

 

    if (this.isUpdate) {

      this.httpClient.put<Hobby>('http://localhost:8080/hobbies/' + this.hobby?.id, formData)

    .subscribe(group => this.navigateToList());

    } else {

    this.httpClient.post<Hobby>('http://localhost:8080/hobbies/create', formData)

    .subscribe(hobby=> this.navigateToList());

     }

  }

 

  private navigateToList() {

    this.router.navigate(['/hobbies']);

  }    

}

