import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {Theme} from '../../../../../model/theme';
import {ThemeService} from '../../../../../services/theme.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UseridStorage} from '../../../../../sessionStorage/userid-storage';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-themedetail-overview',
  templateUrl: './themedetail-overview.component.html',
  styleUrls: ['./themedetail-overview.component.css'],
  providers: [ThemeService, UseridStorage]

})
export class ThemedetailOverviewComponent implements OnInit, AfterViewChecked {
  page_title = '';
  error_message = '';
  public theme: Theme = {
    id: 0,
    name: '',
    description: '',
    tags: [''],
    image: ''
  };
  public themeId;
  i = 0;
  editing = 0;
  tagValue = '';

  constructor(private themeService: ThemeService, private route: ActivatedRoute, private useridStorage: UseridStorage, private router: Router, private translate: TranslateService) {
    this.themeId = this.route.parent.snapshot.params['themeId'];
    console.log('themeId = ' + this.themeId);

  }

  ngOnInit() {
    this.translate.get('Kandoe.Themedetail.overview.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    });
    window.document.title = this.page_title;
    this.themeService.getTheme(this.themeId, this.useridStorage.getUserId()).subscribe(data => {
        this.theme = data;
      },
      error => {
        this.translate.get('Kandoe.Themedetail.overview.error_read', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });

  }

  ngAfterViewChecked() {
  }

  save() {
    this.themeService.updateTheme(this.theme, this.useridStorage.getUserId()).subscribe(data => {
        this.theme = data;
        // routing naar andere component
      },
      error => {
        this.translate.get('Kandoe.Themedetail.overview.error_save', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });
    this.editing = 0;
  }

  deleteTheme(id: number) {
    this.themeService.deleteThemeInOverview(id, this.useridStorage.getUserId()).subscribe(data => {
        this.router.navigate(['themes']);
      },
      error => {
        this.translate.get('Kandoe.Themedetail.overview.error_delete', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });
  }

  addTag() {
    this.theme.tags.push(this.tagValue);
    this.tagValue = '';
  }

  deleteTag(i) {
    this.theme.tags.splice(i, 1);
  }
}
