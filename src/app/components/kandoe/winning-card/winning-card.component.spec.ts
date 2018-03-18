import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinningCardComponent } from './winning-card.component';

describe('WinningCardComponent', () => {
  let component: WinningCardComponent;
  let fixture: ComponentFixture<WinningCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinningCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinningCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
