import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../model/theme';
import {User} from '../../../model/user';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {

  // public user: User = {id: 1, email: 'quinten.didden@student.kdg.be', lastname: 'Didden', firstname: 'Quinten', organiser: 'true'};
  // public theme: Theme = {id: 1, themedescription: 'bla', themename: 'bla', themetag: ['aaa', 'aaa', 'aaa'], themeUsers: [this.user.email]};
  //
  // public theme2: Theme = {id: 2, themedescription: 'ttt', themename: 'aaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  //
  // public theme3: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  // public theme4: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  // public theme5: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  // public theme6: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  // public theme7: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  // public theme8: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  // public themes = [this.theme, this.theme2, this.theme3, this.theme4, this.theme5, this.theme6, this.theme7, this.theme8];

  public themesarray = [];

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    window.document.title = 'Uw thema\'s';
    this.themeService.getThemes().subscribe(
      themes => {
        this.themesarray = themes;

        console.log(this.themesarray[0].themetag);
      }
    );

  }

  deleteTheme(theme) {
    this.themesarray = this.themesarray.filter(deletedtheme => deletedtheme !== theme);
    // this.themeService.deleteTheme(theme).subscribe();
  }

}
