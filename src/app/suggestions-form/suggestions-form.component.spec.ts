import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsFormComponent } from './suggestions-form.component';

describe('SuggestionsFormComponent', () => {
  let component: SuggestionsFormComponent;
  let fixture: ComponentFixture<SuggestionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
