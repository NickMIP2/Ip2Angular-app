import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseReviewComponent } from './phase-review.component';

describe('PhaseReviewComponent', () => {
  let component: PhaseReviewComponent;
  let fixture: ComponentFixture<PhaseReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
