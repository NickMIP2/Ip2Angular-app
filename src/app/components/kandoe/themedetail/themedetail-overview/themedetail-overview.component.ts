import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
import {Theme} from '../../../../model/theme';
import {ThemeService} from '../../../../services/theme.service';
import {ActivatedRoute} from '@angular/router';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-themedetail-overview',
  templateUrl: './themedetail-overview.component.html',
  styleUrls: ['./themedetail-overview.component.css'],
  providers: [ThemeService, UseridStorage]

})
export class ThemedetailOverviewComponent implements OnInit, AfterViewChecked {
  public theme: Theme = {
    id: 0,
    name: 'Oeps',
    description: 'Er ging iets fout bij het ophalen van dit thema, probeer opnieuw',
    tags: ['']
  };
  public themeId;
  i = 0;
  editing = 0;
  tagValue = '';

  constructor(private themeService: ThemeService, private route: ActivatedRoute, private useridStorage: UseridStorage) {
    this.themeId = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.themeService.getTheme(this.themeId, this.useridStorage.getUserId()).subscribe(data => {
      this.theme = data;
    },
      error => {
        console.error("Error loading theme details!");
        console.log(error);
        alert("Error loading theme details");
      });
  }

  ngAfterViewChecked() {
    window.document.title = 'Thema ' + this.theme.name;
  }

  save() {
    this.themeService.updateTheme(this.theme, this.useridStorage.getUserId()).subscribe(data => {
        this.theme = data;
      // routing naar andere component
      },
      error => {
        console.error("Error saving Theme!");
        console.log(error);
        alert("Error saving Theme");
      });
    this.editing = 0;
  }

  deleteTheme() {
    this.themeService.deleteTheme(this.themeId).subscribe(data => {
        // routing naar andere component
      },
      error => {
        console.error("Error deleting theme!");
        console.log(error);
        alert("Error deleting theme");
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
