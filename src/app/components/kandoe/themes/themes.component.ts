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

  // public user: User = {id: 1, email: 'quinten.didden@student.kdg.be', lastname: 'Didden', firstname: 'Quinten', organiser: 'true'};
  // public theme: Theme = {id: 1, description: 'bla', name: 'bla', tags: ['aaa', 'aaa', 'aaa'], themeUsers: [this.user.email]};
  //
  // public theme2: Theme = {id: 2, description: 'ttt', name: 'aaa', tags: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  //
  // public theme3: Theme = {id: 3, description: 'zttt', name: 'aaaaaaa', tags: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  // public theme4: Theme = {id: 3, description: 'zttt', name: 'aaaaaaa', tags: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  // public theme5: Theme = {id: 3, description: 'zttt', name: 'aaaaaaa', tags: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  // public theme6: Theme = {id: 3, description: 'zttt', name: 'aaaaaaa', tags: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  // public theme7: Theme = {id: 3, description: 'zttt', name: 'aaaaaaa', tags: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  // public theme8: Theme = {id: 3, description: 'zttt', name: 'aaaaaaa', tags: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  // public themes = [this.theme, this.theme2, this.theme3, this.theme4, this.theme5, this.theme6, this.theme7, this.theme8];

  public themes = [];

  constructor(private themeService: ThemeService, private useridStorage: UseridStorage) {
  }

  ngOnInit() {
    window.document.title = 'Uw thema\'s';
    this.themeService.getThemesOfUser(this.useridStorage.getUserId()).subscribe(data => {
        this.themes = data;
      },
      error => {
        console.error("Error loading themes!");
        console.log(error);
        alert("Error loading themes");
      });
  }

  deleteTheme(theme) {
    this.themes = this.themes.filter(deletedtheme => deletedtheme !== theme);
    // this.themeService.deleteTheme(theme).subscribe();
  }

}
