import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewThemeComponent} from './new-theme.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ThemeService} from '../../../services/theme.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('NewThemeComponent', () => {
  let component: NewThemeComponent;
  let fixture: ComponentFixture<NewThemeComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let spy: jasmine.Spy;
  let themeService: ThemeService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewThemeComponent],
      imports: [RouterTestingModule, HttpClientModule, FormsModule],
      providers: [ThemeService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewThemeComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.container'));
    element = de.nativeElement;
    spy = spyOn(themeService, 'createTheme').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have create button', () => {
    expect(element.innerHTML).toContain('toevoegen');
  });


});
