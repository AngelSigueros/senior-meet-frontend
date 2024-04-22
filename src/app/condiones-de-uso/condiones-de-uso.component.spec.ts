import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondionesDeUsoComponent } from './condiones-de-uso.component';

describe('CondionesDeUsoComponent', () => {
  let component: CondionesDeUsoComponent;
  let fixture: ComponentFixture<CondionesDeUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondionesDeUsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CondionesDeUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
