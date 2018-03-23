import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {SessionService} from '../../../services/session.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {ThemeService} from '../../../services/theme.service';
import {Theme} from '../../../model/theme';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  public userId;
  public themes = [];
  public theme = new Theme(null, '', '', [''], '');
  public selecting = true;

  constructor(private themeService: ThemeService, private snackBar: MatSnackBar, private router: Router, private titleService: Title, private sessionService: SessionService, private useridStorage: UseridStorage) {
    this.userId = useridStorage.getUserId();
  }

  ngOnInit() {
    this.titleService.setTitle('Analyse');

    this.themeService.getThemesOfUser(this.useridStorage.getUserId()).subscribe(data => {
        this.themes = data;
      },
      error => {
        this.snackBar.open('Fout bij ophalen themas', 'x', {duration: 2000});
      });
  }

  submitSelectedTheme() {
    this.selecting = false;
  }
}
