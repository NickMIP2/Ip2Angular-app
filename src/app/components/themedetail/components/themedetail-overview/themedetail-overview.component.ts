import {Component, Input, OnInit} from '@angular/core';
import {Theme} from '../../../../model/theme';

@Component({
  selector: 'app-themedetail-overview',
  templateUrl: './themedetail-overview.component.html',
  styleUrls: ['./themedetail-overview.component.css']
})
export class ThemedetailOverviewComponent implements OnInit {
  @Input() public theme: Theme = {
    id: 10,
    themename: 'Reizen',
    themedescription: 'op reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reisop reis',
    themetag: 'reis'
  };

  editing = 0;

  constructor() {
  }

  ngOnInit() {
  }

  save(itemId) {
    this.editing = 0;
    // thema opslaan via call in service
  }

}
