import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {

  imageUrl = '/assets/img/4cf7c196-2fe5-4264-8543-d9a67ead932a.jpg'

  // theme: 'light' | 'dark' | 'auto' = 'light';

  // changeTheme(theme: 'light' | 'dark' | 'auto') {
  //   console.log(theme);
  //   this.theme = theme;
  //   // Aquí puedes agregar la lógica para cambiar realmente el tema en tu aplicación
  // }

  constructor(private renderer: Renderer2) {}

  changeTheme(theme: 'light' | 'dark' | 'auto') {
    console.log(theme);
    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'auto-theme');
    this.renderer.addClass(document.body, `${theme}-theme`);
  }
}
