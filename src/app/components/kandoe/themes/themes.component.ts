import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../model/theme';
import {User} from '../../../model/user';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {

  public user: User = {id: 1, email: 'quinten.didden@student.kdg.be', lastName: 'Didden', firstName: 'Quinten', organisor: 'true'};
  public themesarray = [];

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    window.document.title = 'Uw thema\'s';
    this.themeService.getThemes().subscribe(
      themes => {
        this.themesarray = themes;

        console.log(this.themesarray[0].themetag);
      }
    );

  }

  deleteTheme(theme) {
    this.themesarray = this.themesarray.filter(deletedtheme => deletedtheme !== theme);
    this.themeService.deleteTheme(theme).subscribe();
  }

}
