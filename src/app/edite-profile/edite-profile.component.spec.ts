import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeProfileComponent } from './edite-profile.component';

describe('EditeProfileComponent', () => {
  let component: EditeProfileComponent;
  let fixture: ComponentFixture<EditeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditeProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
