import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorsComponent } from './advisors.component';

describe('AdvisorsComponent', () => {
  let component: AdvisorsComponent;
  let fixture: ComponentFixture<AdvisorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
