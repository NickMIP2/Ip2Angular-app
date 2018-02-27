import {Component, OnInit} from '@angular/core';
import {Input} from 'angular2/core';

@Component({
  selector: 'app-themedetail-navbar',
  templateUrl: './themedetail-navbar.component.html',
  styleUrls: ['./themedetail-navbar.component.css']
})
export class ThemedetailNavbarComponent implements OnInit {

  @Input() public themeId: number;

  constructor() {
  }

  ngOnInit() {
  }

}
