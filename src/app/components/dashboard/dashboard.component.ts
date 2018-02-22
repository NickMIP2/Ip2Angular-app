import {Component, OnInit} from '@angular/core';

import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = '...';

  constructor(private titleService: Title, private translateService: TranslateService) {
this.translateService.setDefaultLang('nl');
  }

  ngOnInit() {

    this.titleService.setTitle(this.title);

  }
}
