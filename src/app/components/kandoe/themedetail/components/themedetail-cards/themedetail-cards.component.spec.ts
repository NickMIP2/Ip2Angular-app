import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemedetailCardsComponent} from './themedetail-cards.component';

describe('ThemedetailCardsComponent', () => {
  let component: ThemedetailCardsComponent;
  let fixture: ComponentFixture<ThemedetailCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemedetailCardsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemedetailCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
