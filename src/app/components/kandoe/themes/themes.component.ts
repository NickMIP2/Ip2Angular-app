import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../model/theme';
import {User} from '../../../model/user';
import {ThemeService} from '../../../services/theme.service';
import {ActivatedRoute} from '@angular/router';
import {UseridStorage} from '../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-theme',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css'],
  providers: [ThemeService, UseridStorage]

})
export class ThemesComponent implements OnInit {

  public themes = [];

  constructor(private themeService: ThemeService, private useridStorage: UseridStorage) {

  }

  ngOnInit() {
    window.document.title = 'Uw thema\'s';
    this.themeService.getThemesOfUser(this.useridStorage.getUserId()).subscribe(data => {
        this.themes = data;
      },
      error => {
        console.error('Error loading themes!');
        console.log(error);
        alert('Error loading themes');
      });
  }

  deleteTheme(id: number) {
    this.themeService.deleteTheme(id, this.useridStorage.getUserId()).subscribe(data => {
        this.themes = data;
      },
      error => {
        console.error('Error deleting theme!');
        console.log(error);
        alert('Error deleting theme');
      });
  }

}
