import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemedetailOrganiserComponent } from './themedetail-organiser.component';

describe('ThemedetailOrganiserComponent', () => {
  let component: ThemedetailOrganiserComponent;
  let fixture: ComponentFixture<ThemedetailOrganiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemedetailOrganiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemedetailOrganiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
