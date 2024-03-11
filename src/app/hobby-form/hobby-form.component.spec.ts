import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyFormComponent } from './hobby-form.component';

describe('HobbyFormComponent', () => {
  let component: HobbyFormComponent;
  let fixture: ComponentFixture<HobbyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HobbyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
