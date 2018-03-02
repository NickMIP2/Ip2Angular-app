import {Component, OnInit} from '@angular/core';
import {User} from '../../../../../model/user';
import {ActivatedRoute, Params} from '@angular/router';
import {ThemeService} from '../../../../../services/theme.service';
import {Theme} from '../../../../../model/theme';

@Component({
  selector: 'app-themedetail-organiser',
  templateUrl: './themedetail-organiser.component.html',
  styleUrls: ['./themedetail-organiser.component.css']
})
export class ThemedetailOrganiserComponent implements OnInit {

  user1: User = {id: 1, email: 'nick.marcoen@student.k', lastName: 'Marcoen', firstName: 'Nick', organisor: 'true'};
  user2: User = {id: 2, email: 'nick.marcoen@student.kd', lastName: 'Marcoe', firstName: 'Nick', organisor: 'false'};
  user3: User = {id: 3, email: 'nick.marcoen@student.kdg', lastName: 'Marco', firstName: 'Nick', organisor: 'true'};
  user4: User = {id: 4, email: 'nick.marcoen@student.kdg.', lastName: 'Marc', firstName: 'Nick', organisor: 'false'};
  user5: User = {id: 5, email: 'nick.marcoen@student.kdg.b', lastName: 'Mar', firstName: 'Nick', organisor: 'false'};
  user6: User = {id: 6, email: 'nick.marcoen@student.kdg.be', lastName: 'Ma', firstName: 'Nick', organisor: 'false'};
  users = [this.user1, this.user2, this.user3, this.user4, this.user5, this.user6];
  public themeId;
  public theme: Theme;

  constructor(private themeService: ThemeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.themeId = this.route.parent.params.forEach((params: Params) => {
      this.themeId = +params['themeId'];
      this.themeService.getTheme(this.themeId).subscribe(theme => {
        this.theme = theme;
      });
    });
    window.document.title = 'Organisators';

  }

  saveChanges() {
    alert('wijzigingen zijn bewaard');
  }
}
