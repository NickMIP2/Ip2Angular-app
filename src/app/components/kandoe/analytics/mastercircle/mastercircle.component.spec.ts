import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastercircleComponent } from './mastercircle.component';

describe('MastercircleComponent', () => {
  let component: MastercircleComponent;
  let fixture: ComponentFixture<MastercircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastercircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastercircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
