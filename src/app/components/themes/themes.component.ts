import {Component, OnInit} from '@angular/core';
import {Theme} from '../../model/theme';
import {User} from '../../model/user';
import {AppDataService} from '../../services/app-data.service';

@Component({
  selector: 'app-theme',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {

  public user: User = {id: 1, email: 'quinten.didden@student.kdg.be', lastName: 'Didden', firstName: 'Quinten', organisor: 'true'};
  public theme;
  // public theme99: Theme = {id: 1, themedescription: 'bla', themename: 'bla', themetag: ['aaa', 'aaa', 'aaa'], themeUsers: [this.user.email]};

  //public theme2: Theme = {id: 2, themedescription: 'ttt', themename: 'aaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};

  //public theme3: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  //public theme4: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  //public theme5: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
  //public theme6: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
 // public theme7: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
 // public theme8: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa'], themeUsers: [this.user.email]};
 // public themes = [this.theme, this.theme2, this.theme3, this.theme4, this.theme5, this.theme6, this.theme7, this.theme8];
  public themes = [this.theme];

  constructor(private dataService: AppDataService) {

  }

  ngOnInit() {
    this.dataService.getThemes().subscribe(data => {this.theme = data[0]});
    window.document.title = 'Uw thema\'s';
  }

}
