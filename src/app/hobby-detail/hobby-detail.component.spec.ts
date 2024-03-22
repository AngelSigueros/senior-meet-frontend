import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyDetailComponent } from './hobby-detail.component';

describe('HobbyDetailComponent', () => {
  let component: HobbyDetailComponent;
  let fixture: ComponentFixture<HobbyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbyDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HobbyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
