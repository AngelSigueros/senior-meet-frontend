import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../models/post.model';
import { AuthenticationService } from '../user-authentication/authentication.service';
import { User } from '../models/user.model';
import { forkJoin } from 'rxjs';
import { Interaction } from '../models/interaction.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})

export class PostListComponent implements OnInit {

  posts: Post[] = [];

  isAdmin: Boolean = false;
  currentUser: User | undefined;
  userPosts : Post[] = [];
  currentPage: number = 1;
  ITEMS_PER_PAGE: number = 4;
  NUM_COLS: number = 2;
  numPosts: number = 0;
  likes: Interaction[][]=[];
  saves: Interaction[][]=[];

  constructor (private authService: AuthenticationService, private http: HttpClient){
    this.authService.isAdmin.subscribe(isAdmin=>this.isAdmin=isAdmin);
  }

  ngOnInit(): void {
    this.loadPosts();
    
  }

  loadPosts() {
    forkJoin({
      posts: this.http.get<Post[]>("http://localhost:8080/post"),
      currentUser: this.http.get<User>('http://localhost:8080/user/account')
    }).subscribe(({ posts, currentUser }) => {
      this.posts = posts;
      this.numPosts=posts.length;
      this.currentUser = currentUser;
      this.inicializarLikesAndSaves();
      this.http.get<Post[]>("http://localhost:8080/post/user/" + currentUser.id).subscribe(userPosts => {
        this.userPosts = userPosts;
      });
    });
  }

  deletePost(postId: number){
    const url = "http://localhost:8080/post/"+postId;
    this.http.delete<Boolean>(url).subscribe(b => {
      this.loadPosts();
    });
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

  isPostfromUser(post: Post):boolean {
    return post !== undefined && this.userPosts.includes(post);;
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber; // Actualizar la página actual
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
    this.http.post<Boolean>(urlLike,interactionToSave).subscribe(b => this.loadPosts());
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
    this.http.post<Boolean>(urlLike,interactionToSave).subscribe(b => this.loadPosts());
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

}
