import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Group } from '../models/group.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-wall',
  standalone: true,
  imports: [NgbCarouselModule, HttpClientModule, RouterLink],
  templateUrl: './home-wall.component.html',
  styleUrl: './home-wall.component.css'
})
export class HomeWallComponent {
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  groups: Group[] = []

	constructor(config: NgbCarouselConfig, private http: HttpClient) {
		// customize default values of carousels used by this component tree
		config.interval = 10000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = false;
	}

  ngOnInit(): void {
    console.log('GroupListComponent');
  
    this.http.get<Group[]>("http://localhost:8080/groups").subscribe(g=>this.groups=g);
  }
}