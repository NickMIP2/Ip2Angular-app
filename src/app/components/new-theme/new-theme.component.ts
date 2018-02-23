import {Component, OnInit} from '@angular/core';
import {Theme} from '../../model/theme';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css']
})
export class NewThemeComponent implements OnInit {


  model = new Theme('', '', '');

  submitted = false;

  ngOnInit() {
    window.document.title = 'Nieuw thema';
  }

  onClickSubmit() {
    // POST met gegevens naar server
    this.submitted = true;
  }

}
