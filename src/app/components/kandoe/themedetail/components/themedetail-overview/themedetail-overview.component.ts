import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {Theme} from '../../../../../model/theme';
import {ThemeService} from '../../../../../services/theme.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UseridStorage} from '../../../../../sessionStorage/userid-storage';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-themedetail-overview',
  templateUrl: './themedetail-overview.component.html',
  styleUrls: ['./themedetail-overview.component.css'],
  providers: [ThemeService, UseridStorage]

})
export class ThemedetailOverviewComponent implements OnInit, AfterViewChecked {
  title = '';
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
  public themeName;
  public themeTags;
  public themeDescription;

  constructor(private themeService: ThemeService,
              private route: ActivatedRoute,
              private useridStorage: UseridStorage,
              private router: Router,
              public snackBar: MatSnackBar,
              private translate: TranslateService) {
    this.themeId = this.route.parent.snapshot.params['themeId'];

  }

  ngOnInit() {

    this.themeService.getTheme(this.themeId, this.useridStorage.getUserId()).subscribe(data => {
        this.theme = data;
      },
      error => {
        this.snackBar.open('Er ging iets mis bij het ophalen van dit thema', 'x', {duration: 2000});

      }, () => this.setValues());

  }

  setValues() {
    this.themeName = this.theme.name;
    this.themeDescription = this.theme.description;
    this.themeTags = this.theme.tags;
  }

  ngAfterViewChecked() {
    window.document.title = 'Thema ' + this.theme.name;
  }

  save() {
    this.themeService.updateTheme(this.theme, this.useridStorage.getUserId()).subscribe(data => {
        this.theme = data;

      },
      error => {
        this.snackBar.open('Opslaan van wijzigingen mislukt!', 'x', {duration: 2000});

      }, () => {
        this.snackBar.open('Wijzigingen opgeslagen', 'x', {duration: 2000});

      });
    this.editing = 0;
  }

  deleteTheme(id: number) {
    this.themeService.deleteThemeInOverview(id, this.useridStorage.getUserId()).subscribe(data => {
        this.router.navigate(['kandoe/themes']);
      },
      error => {
        this.snackBar.open('Fout bij verwijderen thema!', 'x', {duration: 3000});

      });
  }

  cancelEditing() {
    this.theme.name = this.themeName;
    this.theme.description = this.themeDescription;
    this.theme.tags.slice(0);
    this.theme.tags = this.themeTags;

    this.editing = 0;
  }

  startEditing() {
    this.editing = 0;
  }

  addTag() {
    this.theme.tags.push(this.tagValue);
    this.tagValue = '';
  }

  deleteTag(i) {
    this.theme.tags.splice(i, 1);
  }
}
