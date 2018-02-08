import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemedetailComponent } from './themedetail.component';

describe('ThemedetailComponent', () => {
  let component: ThemedetailComponent;
  let fixture: ComponentFixture<ThemedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
