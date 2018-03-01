import { Component, OnInit } from '@angular/core';
import {User} from '../../../../model/user';
import {Theme} from '../../../../model/theme';
import {ThemeService} from '../../../../services/theme.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-themedetail-organiser',
  templateUrl: './themedetail-organiser.component.html',
  styleUrls: ['./themedetail-organiser.component.css']
})
export class ThemedetailOrganiserComponent implements OnInit {

  /*
  user1: User = {id: 1, email: 'nick.marcoen@student.k', lastname: 'Marcoen', firstname: 'Nick', organiser: 'true'};
  user2: User = {id: 2, email: 'nick.marcoen@student.kd', lastname: 'Marcoe', firstname: 'Nick', organiser: 'false'};
  user3: User = {id: 3, email: 'nick.marcoen@student.kdg', lastname: 'Marco', firstname: 'Nick', organiser: 'true'};
  user4: User = {id: 4, email: 'nick.marcoen@student.kdg.', lastname: 'Marc', firstname: 'Nick', organiser: 'false'};
  user5: User = {id: 5, email: 'nick.marcoen@student.kdg.b', lastname: 'Mar', firstname: 'Nick', organiser: 'false'};
  user6: User = {id: 6, email: 'nick.marcoen@student.kdg.be', lastname: 'Ma', firstname: 'Nick', organiser: 'false'};
  users = [this.user1, this.user2, this.user3, this.user4, this.user5, this.user6];
  */
  public urlid;
  public theme: Theme;

  constructor(private themeService: ThemeService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.urlid = +this.route.snapshot.paramMap.get('id');
    this.themeService.getTheme(this.urlid).subscribe(theme => {
      this.theme = theme;
    });

    window.document.title = 'Organisators';
  }

  saveChanges() {
    alert('wijzigingen zijn bewaard');
  }
}
