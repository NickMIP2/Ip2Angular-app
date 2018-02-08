import {Component, Input, OnInit} from '@angular/core';
import {Theme} from '../../../../model/theme';

@Component({
  selector: 'app-themedetail-navbar',
  templateUrl: './themedetail-navbar.component.html',
  styleUrls: ['./themedetail-navbar.component.css']
})
export class ThemedetailNavbarComponent implements OnInit {

  constructor() { }
  @Input() public theme: Theme;
  ngOnInit() {
  }

}
