import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWallComponent } from './home-wall.component';

describe('HomeWallComponent', () => {
  let component: HomeWallComponent;
  let fixture: ComponentFixture<HomeWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
