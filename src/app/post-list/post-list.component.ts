import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../models/post.model';
import { AuthenticationService } from '../user-authentication/authentication.service';
import { User } from '../models/user.model';
import { forkJoin } from 'rxjs';

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
  numPosts: number = 0;

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

}
