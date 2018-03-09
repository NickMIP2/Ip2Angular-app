import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemedetailOverviewComponent} from './themedetail-overview.component';

describe('ThemedetailOverviewComponent', () => {
  let component: ThemedetailOverviewComponent;
  let fixture: ComponentFixture<ThemedetailOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemedetailOverviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemedetailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
