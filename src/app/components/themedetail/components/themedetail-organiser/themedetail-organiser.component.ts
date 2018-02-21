import { Component, OnInit } from '@angular/core';
import {User} from '../../../../model/user';

@Component({
  selector: 'app-themedetail-organiser',
  templateUrl: './themedetail-organiser.component.html',
  styleUrls: ['./themedetail-organiser.component.css']
})
export class ThemedetailOrganiserComponent implements OnInit {

  user1: User = {id: 1, email: 'nick.marcoen@student.kdg.be', lastName: 'Marcoen', firstName: 'Nick'};
  user2: User = {id: 2, email: 'nick.marcoen@student.kdg.be', lastName: 'Marcoe', firstName: 'Nick'};
  user3: User = {id: 3, email: 'nick.marcoen@student.kdg.be', lastName: 'Marco', firstName: 'Nick'};
  user4: User = {id: 4, email: 'nick.marcoen@student.kdg.be', lastName: 'Marc', firstName: 'Nick'};
  user5: User = {id: 5, email: 'nick.marcoen@student.kdg.be', lastName: 'Mar', firstName: 'Nick'};
  user6: User = {id: 6, email: 'nick.marcoen@student.kdg.be', lastName: 'Ma', firstName: 'Nick'};
  users = [this.user1, this.user2, this.user3, this.user4, this.user5, this.user6];
  constructor() { }

  ngOnInit() {
    window.document.title = 'Organisators';
  }

}
