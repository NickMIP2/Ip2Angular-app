import {Component, OnInit, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-themedetail-navbar',
  templateUrl: './themedetail-navbar.component.html',
  styleUrls: ['./themedetail-navbar.component.css']
})
export class ThemedetailNavbarComponent implements OnInit {

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
  }

}
