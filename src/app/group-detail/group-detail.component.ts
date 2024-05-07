import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { Interaction } from '../models/interaction.model';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from '../user-authentication/authentication.service';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css'
})
export class GroupDetailComponent implements OnInit{

  group: Group |undefined
  groups: any
  currentUser: User|undefined
  posts: Post[] = []
  currentPage: number = 1;
  ITEMS_PER_PAGE: number = 4;
  NUM_COLS: number = 2;
  numPosts: number = 0;
  likes: Interaction[][]=[];
  saves: Interaction[][]=[];
  isAdmin: Boolean = false;
  userPosts : Post[] = [];


  constructor (private http: HttpClient, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService){
      this.authService.isAdmin.subscribe(isAdmin=>this.isAdmin=isAdmin);
    }
  
  ngOnInit(): void {
   
    this.loadGroupDetail();
  }

  loadGroupDetail(){
    this.http.get<User>("http://localhost:8080/user/account").subscribe(u => this.currentUser=u);

    this.activatedRoute.params.subscribe(params=> {
     this.http.get<Group>("http://localhost:8080/groups/" + params['id']).subscribe(g=>{
       this.group=g;
       this.http.get<Post[]>('http://localhost:8080/post/group/' + this.group.id).subscribe(ps => this.posts=ps)
       console.log(this.group);
     })
    });
  }

  isGroupFromUser(group: Group): boolean {
    if (this.currentUser && this.currentUser.groups) {
      console.log(this.currentUser.groups);
      //return this.currentUser.groups.includes(group);
      return this.currentUser?.groups.some(grupo => grupo.id === group.id);
    } else {
      return false;
    }
  }

  

  removeGroupFromUser(group: Group){
    if (this.currentUser) {
      this.http.delete('http://localhost:8080/user/' + this.currentUser.id + '/groups/' + group.id).subscribe(s => {
        //this.router.navigate(['/groups']);
        this.loadGroupDetail();
      });
    } else {
      // Manejar el caso en el que this.currentUser es undefined
      console.error('Error: currentUser is undefined');
    }
   }

  addGroupToUser(group: Group) {
    if (this.currentUser) {
      this.http.post('http://localhost:8080/user/' + this.currentUser.id + '/groups/' + group.id, '').subscribe(s => {
        //this.router.navigate(['/groups']);
        this.loadGroupDetail();
      });
    } else {
      // Manejar el caso en el que this.currentUser es undefined
      console.error('Error: currentUser is undefined');
    }
   }

   onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber; // Actualizar la página actual
  }

  addsave(postToSave: Post):void{
    if(!this.currentUser!||!postToSave) return;
    const id:number = 0;
    const type: string ='SAVE';
    const user: User = this.currentUser;
    const post: Post = postToSave;
    const date: Date = new Date();

    let interactionToSave: Interaction = {
      id: id,
      user: user,
      post: post,
      type: type,
      date: date
    }

    const urlLike = 'http://localhost:8080/post/'+postToSave?.id +'/add-save/'+this.currentUser?.id;
    this.http.post<Boolean>(urlLike,interactionToSave).subscribe(b => this.loadGroupDetail());
  }

  inicializarLikesAndSaves(): void {
    const requests = this.posts.map(post => {
      const likesRequest = this.http.get<Interaction[]>("http://localhost:8080/post/"+post.id+"/interactions/likes");
      const savesRequest = this.http.get<Interaction[]>("http://localhost:8080/post/"+post.id+"/interactions/saves");
      return forkJoin([likesRequest, savesRequest]);
    });

    forkJoin(requests).subscribe(responses => {
      responses.forEach((response, index) => {
        const [likes, saves] = response;
        this.likes[this.posts[index].id] = likes;
        this.saves[this.posts[index].id] = saves;
      });
    });
  }

  addlike(postToLike:Post){
    if (!this.currentUser||!postToLike) return;
    const id:number = 0;
    const type: string ='LIKE';
    const user: User  = this.currentUser;
    const post: Post = postToLike;
    const date: Date = new Date();

    let interactionToSave: Interaction = {
      id: id,
      user: user,
      post: post,
      type: type,
      date: date
    }

    const urlLike = 'http://localhost:8080/post/'+postToLike?.id+'/add-like/'+this.currentUser?.id;
    this.http.post<Boolean>(urlLike,interactionToSave).subscribe(b => this.loadGroupDetail());
  }

  deletePost(postId: number){
    const url = "http://localhost:8080/post/"+postId;
    this.http.delete<Boolean>(url).subscribe(b => {
      this.loadGroupDetail();
    });
  }

  isPostfromUser(post: Post):boolean {
    return post !== undefined && this.userPosts.includes(post);;
  }

  formatDateTime (date: string): string {
    const formattedDate = new Date(date);
  // Sumar dos horas a la hora registrada
    formattedDate.setHours(formattedDate.getHours() + 2);
    // Obtener los componentes de la fecha
    
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
  
    // Combinar los componentes en el formato deseado
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }


}
