import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyListComponent } from './hobby-list.component';

describe('HobbyListComponent', () => {
  let component: HobbyListComponent;
  let fixture: ComponentFixture<HobbyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HobbyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
