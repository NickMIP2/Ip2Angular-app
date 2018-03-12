import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewThemeComponent} from './new-theme.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ThemeService} from '../../../services/theme.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FileUploadComponent} from '../../../file-upload/file-upload.component';
import {Theme} from '../../../model/theme';
import {Observable} from 'rxjs/Observable';

describe('NewThemeComponent', () => {
  let component: NewThemeComponent;
  let fixture: ComponentFixture<NewThemeComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let spy: jasmine.Spy;
  let themeService: ThemeService;
  let navigateSpy;
  let mockCreatedTheme: Theme;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewThemeComponent, FileUploadComponent],
      imports: [RouterTestingModule, HttpClientModule, FormsModule],
      providers: [ThemeService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewThemeComponent);
    component = fixture.componentInstance;
    themeService = fixture.debugElement.injector.get(ThemeService); /*TestBed.get(ThemeService);*/
    mockCreatedTheme = {id: 1, name: 'name', description: 'description', tags: ['tags'], image: 'imageurl'};
    de = fixture.debugElement.query(By.css('.container'));
    element = de.nativeElement;
    spy = spyOn(themeService, 'createTheme').and.returnValue(Observable.of(mockCreatedTheme));
    navigateSpy = spyOn((<any>component).router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have create button', () => {
    expect(element.innerHTML).toContain('toevoegen');
  });

  it('should navigate to themedetail on creation', () => {
    component.theme = mockCreatedTheme;

    component.createTheme();
    expect(navigateSpy).toHaveBeenCalledWith(['kandoe/themes/' + mockCreatedTheme.id + '/overview']);
  });

  it('should navigate to themes', () => {
    component.navigateAbort();
    expect(navigateSpy).toHaveBeenCalledWith(['kandoe/themes/']);
  });

})
;
