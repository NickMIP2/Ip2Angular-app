import {Component, Input, OnInit} from '@angular/core';
import {Theme} from '../../../../model/theme';

@Component({
  selector: 'app-themedetail-overview',
  templateUrl: './themedetail-overview.component.html',
  styleUrls: ['./themedetail-overview.component.css']
})
export class ThemedetailOverviewComponent implements OnInit {
  @Input() public theme: Theme = {
    name: 'Reizen',
    description: 'op reisop reisop reisop op reisop reisop reisop reisop reis',
    tags: 'reis'
  };

  editing = 0;
  tagValue = '';

  constructor() {
  }

  ngOnInit() {

    window.document.title = 'Thema ' + this.theme.name;
  }

  save(itemId) {
    this.editing = 0;
    // thema opslaan via call in service
  }
  deleteTheme() {}
 // addTag() {
   // this.theme.themetag.push(this.tagValue);
   // this.tagValue = '';
  // }
  // deleteTag(i) {
   // this.theme.themetag.splice(i, 1);
  // }
}
