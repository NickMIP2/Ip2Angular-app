import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {Theme} from '../../../model/theme';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-theme',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css'],
  providers: [ThemeService, UseridStorage]

})
export class ThemesComponent implements OnInit {
  public themes: Set<Theme> = new Set<Theme>();

  constructor(private themeService: ThemeService, private useridStorage: UseridStorage, private router: Router, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    window.document.title = 'Uw thema\'s';
    this.themeService.getThemesOfUser(this.useridStorage.getUserId()).subscribe(data => {
        this.themes = data;
      },
      error => {
        console.error('Error loading themes!');
        console.log(error);
        this.snackBar.open('Er ging iets mis bij het ophalen van themas!', 'x', {duration: 2000});
      });

  }

  goToNewTheme() {
    this.router.navigate(['kandoe/themes/thema-toevoegen']);

  }

  goToDetail(id: number) {
    this.router.navigate(['kandoe/themes/' + id]);
  }

  deleteTheme(id: number) {
    this.themeService.deleteTheme(id, this.useridStorage.getUserId()).subscribe(data => {
        this.themes = data;
      },
      error => {
        console.error('Error deleting theme!');
        console.log(error);
        this.snackBar.open('Thema verwijderen mislukt!', 'x', {duration: 2000});

      }, () => {
        this.snackBar.open('Thema succesvol verwijderd!', 'x', {duration: 2000});
      });
  }

}
