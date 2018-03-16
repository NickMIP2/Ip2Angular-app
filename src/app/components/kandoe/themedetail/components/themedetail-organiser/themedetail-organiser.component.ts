import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../../../model/theme';
import {ThemeService} from '../../../../../services/theme.service';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-themedetail-organiser',
  templateUrl: './themedetail-organiser.component.html',
  styleUrls: ['./themedetail-organiser.component.css']
})
export class ThemedetailOrganiserComponent implements OnInit {
  page_title = '';
  error_message = '';
  public themeId;
  public theme: Theme;

  constructor(private themeService: ThemeService, private route: ActivatedRoute, private translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.get('Kandoe.Themedetail.organiser.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    });
    window.document.title = this.page_title;
  }

  saveChanges() {
    this.translate.get('Kandoe.Themedetail.categories.notification_changes', {value: 'world'}).subscribe(e => {
      this.error_message = e;
    });
    alert(this.error_message);
  }
}
