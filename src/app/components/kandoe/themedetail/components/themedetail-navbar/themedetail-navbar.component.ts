import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ThemeService} from '../../../../../services/theme.service';
import {MatSnackBar} from '@angular/material';
import {UseridStorage} from '../../../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-themedetail-navbar',
  templateUrl: './themedetail-navbar.component.html',
  styleUrls: ['./themedetail-navbar.component.css']
})
export class ThemedetailNavbarComponent implements OnInit, AfterViewInit {
  public theme;
  public themeId;

  constructor(private route: ActivatedRoute, private themeService: ThemeService, private snackBar: MatSnackBar, private useridStorage: UseridStorage) {

    this.themeId = this.route.snapshot.params['themeId'];
    console.log('undefined waarshcijnlijk:' + this.themeId);
  }

  ngAfterViewInit() {

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

}
