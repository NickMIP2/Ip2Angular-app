import {AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Theme} from '../../../../../model/theme';
import {ThemeService} from '../../../../../services/theme.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-themedetail-overview',
  templateUrl: './themedetail-overview.component.html',
  styleUrls: ['./themedetail-overview.component.css']
})
export class ThemedetailOverviewComponent implements OnInit, AfterViewChecked {
  @Input() public theme: Theme = {
    id: 0,
    themename: 'Oeps',
    themedescription: 'Er ging iets fout bij het ophalen van dit thema, probeer opnieuw',
    themetag: '',
    themeUsers: ['']
  };
  public themeId;
  editing = 0;
  tagValue = '';
  sub;
  parentRouteId;
  url;

  constructor(private themeService: ThemeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.themeId = this.route.parent.params.forEach((params: Params) => {
      this.themeId = +params['themeId'];
      this.themeService.getTheme(this.themeId).subscribe(theme => {
        this.theme = theme;
      });
    });


  }

  ngAfterViewChecked() {
    window.document.title = 'Thema ' + this.theme.themename;
  }

  save() {
    this.themeService.updateTheme(this.theme).subscribe();
    this.editing = 0;
    // thema opslaan via call in service
  }

  deleteTheme(theme) {

    this.themeService.deleteTheme(theme).subscribe();
  }

  // addTag() {
  //   this.theme.themetag.push(this.tagValue);
  //   this.tagValue = '';
  // }
  //
  // deleteTag(i) {
  //   this.theme.themetag.splice(i, 1);
  // }
}
