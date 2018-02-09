import {Component, OnInit} from '@angular/core';
import {Theme} from '../../model/theme';

@Component({
  selector: 'app-theme',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {


  public theme: Theme = {id: 1, themedescription: 'bla', themename: 'bla', themetag: 'bla'};

  public theme2: Theme = {id: 2, themedescription: 'ttt', themename: 'aaa', themetag: 'aaa'};

  public theme3: Theme = {id: 3, themedescription: 'zttt', themename: 'aaaaaaa', themetag: 'aaa'};
  public themes = [this.theme, this.theme2, this.theme3];

  constructor() {

  }

  ngOnInit() {
  }

}
