import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../model/theme';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css']
})
export class NewThemeComponent implements OnInit {


  model = new Theme(0, '', '', '', ['']);

  submitted = false;

  constructor(private themeService: ThemeService) {

  }

  ngOnInit() {
    window.document.title = 'Nieuw thema';
  }

  onClickSubmit() {
    // POST met gegevens naar server
    this.themeService.createTheme(this.model).subscribe();
    console.log(this.model);
    this.submitted = true;
  }

}
