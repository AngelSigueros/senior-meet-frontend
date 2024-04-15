import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Group } from '../models/group.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.css'
})
export class GroupFormComponent implements OnInit{
  groupForm = new FormGroup({
    id: new FormControl(0),
    title: new FormControl(''),
    description: new FormControl(''),
    photoUrl: new FormControl(''),
    rules:  new FormControl('')
});
photoFile: File | undefined;
photoPreview: string | undefined;
group: Group| undefined;
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
      

      this.httpClient.get<Group>('http://localhost:8080/groups/' + id).subscribe(group => {
        this.groupForm.reset(group);
        this.isUpdate = true;
        this.group = group;

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
    formData.append('photoUrl', this.groupForm.get('photoUrl')?.value ?? '');
    formData.append('id', this.groupForm.get('id')?.value?.toString() ?? '0');
    formData.append('title', this.groupForm.get('title')?.value ?? '');
    formData.append('description', this.groupForm.get('description')?.value ?? '');
    formData.append('rules', this.groupForm.get('rules')?.value ?? '');

    console.log(formData)
    if(this.photoFile) {
      formData.append("photo", this.photoFile);
    }

    if (this.isUpdate) {
      this.httpClient.put<Group>('http://localhost:8080/groups/' + this.group?.id, formData)
    .subscribe(group => this.navigateToList());
    } else {
    this.httpClient.post<Group>('http://localhost:8080/groups/create', formData)
    .subscribe(group=> this.navigateToList());
     }
  }

  private navigateToList() {
    this.router.navigate(['/groups']);
  }    
}






  

 

