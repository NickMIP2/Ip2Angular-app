import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemedetailNavbarComponent} from './themedetail-navbar.component';

describe('ThemedetailNavbarComponent', () => {
  let component: ThemedetailNavbarComponent;
  let fixture: ComponentFixture<ThemedetailNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemedetailNavbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemedetailNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
