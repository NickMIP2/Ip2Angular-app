import {Component, OnInit, Input} from '@angular/core';

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
