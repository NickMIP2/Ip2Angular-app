import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KandoeComponent} from './kandoe.component';

describe('KandoeComponent', () => {
  let component: KandoeComponent;
  let fixture: ComponentFixture<KandoeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KandoeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KandoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
