import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {Theme} from '../../../model/theme';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-theme',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css'],
  providers: [ThemeService, UseridStorage]

})
export class ThemesComponent implements OnInit {
  page_title = '';
  error_message = '';
  public themes: Set<Theme> = new Set<Theme>();

  constructor(private themeService: ThemeService, private useridStorage: UseridStorage, private router: Router, private translate: TranslateService) {

  }

  ngOnInit() {
    this.translate.get('Kandoe.Themes.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    });
    window.document.title = this.page_title;
    this.themeService.getThemesOfUser(this.useridStorage.getUserId()).subscribe(data => {
        this.themes = data;
      },
      error => {
        this.translate.get('Kandoe.Themes.error_read', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });

  }

  goToNewTheme() {
    this.router.navigate(['kandoe/themes/thema-toevoegen']);

  }
  goToDetail(id: number) {
    this.router.navigate(['kandoe/themes/' + id]);
  }
  deleteTheme(id: number) {
    this.themeService.deleteTheme(id, this.useridStorage.getUserId()).subscribe(data => {
        this.themes = data;
      },
      error => {
        this.translate.get('Kandoe.Themes.error_read', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });
  }

}
