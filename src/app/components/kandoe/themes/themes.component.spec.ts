import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemesComponent} from './themes.component';
import {Theme} from '../../../model/theme';
import {RouterTestingModule} from '@angular/router/testing';
import {ThemeService} from '../../../services/theme.service';
import { HttpClientModule} from '@angular/common/http';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('ThemeComponent', () => {
  let component: ThemesComponent;
  let fixture: ComponentFixture<ThemesComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let mockTheme: Theme;
  let mockThemes: Set<Theme>;
  let themeService: ThemeService;
  let spy: jasmine.Spy;
  let navigateSpy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemesComponent],
      imports: [RouterTestingModule, HttpClientModule, FormsModule],
      providers: [{provide: ThemeService}]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('.borderBlue'));
    element = de.nativeElement;
    themeService = fixture.debugElement.injector.get(ThemeService);
    mockTheme = {id: 1, name: 'theme name', description: 'theme description', tags: ['tag'], image: 'imageurl'};
    mockThemes = new Set<Theme>();
    mockThemes.add(mockTheme);
    navigateSpy = spyOn((<any>component).router, 'navigate');


    spy = spyOn(themeService, 'getThemesOfUser').and.returnValue(Observable.of(mockThemes));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have values', () => {
      const theme = new Theme(
        1, 'themanaam',
        'themabeschrijving',
        ['tag'],
        'imageurl');
      expect(theme.id).toEqual(1);
      expect(theme.tags[0]).toEqual('tag');
      expect(theme.name).toEqual('themanaam');
      expect(theme.description).toEqual('themabeschrijving');
      expect(theme.image).toEqual('imageurl');
    }
  );


  it('should show the themes after getThemes promise resolves', async () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.themes).toEqual(jasmine.objectContaining(mockThemes));
      expect(element.innerText.replace(/\s\s+/g, ' ')).toContain(mockThemes[0].name);
    });
  });

  it('should navigate to detail', () => {
    component.goToDetail(mockTheme.id);
    expect(navigateSpy).toHaveBeenCalledWith(['kandoe/themes/1']);
  });

  it('should navigate to new theme', () => {
    component.goToNewTheme();
    expect(navigateSpy).toHaveBeenCalledWith(['kandoe/themes/thema-toevoegen']);
  });
});
