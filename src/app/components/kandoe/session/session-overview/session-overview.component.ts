import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-session-overview',
  templateUrl: './session-overview.component.html',
  styleUrls: ['./session-overview.component.css']
})
export class SessionOverviewComponent implements OnInit {
  page_title = '';
  error_message = '';

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('Kandoe.Session.overview.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    });
    window.document.title = this.page_title;
  }

}
