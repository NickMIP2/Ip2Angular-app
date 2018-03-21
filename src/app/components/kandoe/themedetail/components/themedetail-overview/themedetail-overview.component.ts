import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {Theme} from '../../../../../model/theme';
import {ThemeService} from '../../../../../services/theme.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UseridStorage} from '../../../../../sessionStorage/userid-storage';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-themedetail-overview',
  templateUrl: './themedetail-overview.component.html',
  styleUrls: ['./themedetail-overview.component.css'],
  providers: [ThemeService, UseridStorage]

})
export class ThemedetailOverviewComponent implements OnInit, AfterViewChecked {
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

  constructor(private themeService: ThemeService, private route: ActivatedRoute, private useridStorage: UseridStorage, private router: Router, public snackBar: MatSnackBar) {
    this.themeId = this.route.parent.snapshot.params['themeId'];
    console.log('themeId = ' + this.themeId);

  }

  ngOnInit() {
    this.themeService.getTheme(this.themeId, this.useridStorage.getUserId()).subscribe(data => {
        this.theme = data;
      },
      error => {
        console.error('Error loading theme details!');
        console.log(error);
        this.snackBar.open('Er ging iets mis bij het ophalen van dit thema', 'x', {duration: 2000});

      });

  }

  ngAfterViewChecked() {
    window.document.title = 'Thema ' + this.theme.name;
  }

  save() {
    this.themeService.updateTheme(this.theme, this.useridStorage.getUserId()).subscribe(data => {
        this.theme = data;

      },
      error => {
        console.error('Error saving Theme!');
        console.log(error);
        this.snackBar.open('Opslaan van wijzigingen mislukt!', 'x', {duration: 2000});

      }, () => {
        this.snackBar.open('Wijzigingen opgeslagen', 'x', {duration: 2000});

      });
    this.editing = 0;
  }

  deleteTheme(id: number) {
    this.themeService.deleteThemeInOverview(id, this.useridStorage.getUserId()).subscribe(data => {
        this.router.navigate(['themes']);
      },
      error => {
        console.error('Error deleting theme!' + this.themeId);
        console.log(error);
        alert('Error deleting theme');
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
