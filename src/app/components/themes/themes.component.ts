import {Component, OnInit} from '@angular/core';
import {Theme} from '../../model/theme';

@Component({
  selector: 'app-theme',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {


  public theme: Theme = {id: 1, themedescription: 'bla', themename: 'bla', themetag: ['aaa', 'aaa', 'aaa']};

  public theme2: Theme = {id: 2, themedescription: 'ttt', themename: 'aaa', themetag: ['aaa', 'aaa']};

  public theme3: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa']};
  public theme4: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa']};
  public theme5: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa']};
  public theme6: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa']};
  public theme7: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa']};
  public theme8: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: ['aaa', 'aaa']};
  public themes = [this.theme, this.theme2, this.theme3, this.theme4, this.theme5, this.theme6, this.theme7, this.theme8];

  constructor() {

  }

  ngOnInit() {
    window.document.title = 'Uw thema\'s';
  }

}
