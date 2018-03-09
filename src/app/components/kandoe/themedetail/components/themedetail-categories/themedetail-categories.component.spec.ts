import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemedetailCategoriesComponent} from './themedetail-categories.component';

describe('ThemedetailCategoriesComponent', () => {
  let component: ThemedetailCategoriesComponent;
  let fixture: ComponentFixture<ThemedetailCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemedetailCategoriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemedetailCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
