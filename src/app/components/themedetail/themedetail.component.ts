import {Component, Input, OnInit} from '@angular/core';
import {Theme} from '../../model/theme';

@Component({
  selector: 'app-themedetail',
  templateUrl: './themedetail.component.html',
  styleUrls: ['./themedetail.component.css']
})

export class ThemedetailComponent implements OnInit {
  @Input() public theme: Theme = {themename: 'Reizen', themedescription: 'op reis', themetag: 'reis'};

  constructor() {
  }

  ngOnInit() {
  }

}
