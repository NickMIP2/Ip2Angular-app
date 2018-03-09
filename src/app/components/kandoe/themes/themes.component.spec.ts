import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemesComponent} from './themes.component';
import {Theme} from '../../../model/theme';
import {RouterTestingModule} from '@angular/router/testing';
import {ThemeService} from '../../../services/theme.service';
import {HttpClientModule} from '@angular/common/http';
import {DebugElement} from '@angular/core';
import {FormsModule} from '@angular/forms';
import 'rxjs/add/observable/of';

describe('ThemeComponent', () => {
  let component: ThemesComponent;
  let fixture: ComponentFixture<ThemesComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let mockThemes: Theme[];
  let themeService: ThemeService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemesComponent],
      imports: [RouterTestingModule, HttpClientModule, FormsModule],
      providers: [ThemeService]
    })
      .compileComponents();
  }));

  /*
  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('.wrapper'));
    element = de.nativeElement;

    themeService = fixture.debugElement.injector.get(ThemeService);
    mockThemes = [
      {id: 1, themename: 'theme name', themedescription: 'theme description', themetag: 'tag', themeUsers: ['user1', 'user2']}];


    spy = spyOn(themeService, 'getThemes').and.returnValue(Observable.of(mockThemes));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list to display the themes', () => {
    expect(element.innerHTML).toContain('ul');
    expect(element.innerHTML).toContain('li');
  });

  it('should have values', () => {
      const theme = new Theme(
        1, 'themanaam',
        'themabeschrijving',
        'tag',
        ['user1', 'user2']);
      expect(theme.id).toEqual(1);
      expect(theme.tags).toEqual('tag');
      expect(theme.name).toEqual('themanaam');
      expect(theme.description).toEqual('themabeschrijving');
      expect(theme.themeUsers[0]).toEqual('user1');
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

  */
});
