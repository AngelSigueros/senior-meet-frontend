import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../models/post.model';
import { Group} from '../models/group.model';
import { User } from '../models/user.model';
import { Interaction } from '../models/interaction.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit{

  groups: Group[] = []
  currentUser: User|undefined

  postForm = this.fb.group({
    id: new FormControl(0),
    content: ['', Validators.required],
    photoUrl:[''],
    videoUrl: [''],
    group: new FormControl(),
    user: new FormControl(),
    interactions: new FormControl(),
    comments: new FormControl(),
    date: new Date()
  });

  photoFile: File | undefined;
  photoPreview: string | undefined;
  post: Post | undefined;
  isUpdate: boolean = false;


  constructor(private fb: FormBuilder, 
    private httpClient: HttpClient, 
    private route: Router,
    private activatedRoute: ActivatedRoute,){}

  ngOnInit(): void {
    //this.httpClient.get<Group[]>("http://localhost:8080/groups").subscribe(g=>this.groups=g);
    this.httpClient.get<User>('http://localhost:8080/user/account').subscribe( u => {
      this.currentUser = u;
      this.httpClient.get<Group[]>("http://localhost:8080/user/"+this.currentUser.id+"/groups").subscribe(g => this.groups=g);
    });
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) return;
      this.httpClient.get<Post>('http://localhost:8080/post/' + id).subscribe(post => {
        this.postForm.reset(post);
        this.isUpdate = true;
        this.post = post;

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
    console.log("Guardando Post");

    let formData = new FormData();

    formData.append('id', this.postForm.get('id')?.value?.toString() ?? '0');
    formData.append('content',this.postForm.get('content')?.value ?? '');
    formData.append('photoUrl',this.postForm.get('photoUrl')?.value ?? '');
    formData.append('videoUrl',this.postForm.get('videoUrl')?.value ?? '');
    formData.append('group',this.postForm.get('group')?.value);
    formData.append('user',this.postForm.get('user')?.value?? this.currentUser )
    formData.append('interactions',this.postForm.get('interactions')?.value ?? []);
    formData.append('comments',this.postForm.get('comments')?.value ?? []);
    const dateValue = this.postForm.get('date')?.value;
    const dateToAppend = dateValue ? new Date(dateValue) : new Date();
    formData.append('date', dateToAppend.toString());

  

    if (this.photoFile){
      formData.append('photo',this.photoFile);
    }

    
    
    const url = 'http://localhost:8080/post';

    if(this.isUpdate){
      this.httpClient.put<Post>(url+"/"+this.post?.id, formData).subscribe(post => 
        {console.log(post);
          //this.postForm.reset();
          this.route.navigate(['/posts']);
        });
    }else{
      this.httpClient.post<Post>(url, formData).subscribe(post => 
        {console.log(post);
          //this.postForm.reset();
          this.route.navigate(['/posts']);
        });
    }

    
  }
}
