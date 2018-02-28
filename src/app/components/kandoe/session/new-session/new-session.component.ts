import {Component, OnInit} from '@angular/core';
import {Session} from '../../../../model/session';
import {ThemeService} from '../../../../services/theme.service';
import {log} from 'util';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
export class NewSessionComponent implements OnInit {
  model = new Session(0, '', true, null, 1, 1, 0, 'testOwner\n');
  submitted = false;
  chance = null;
  participantEmail = '';
  public themesArray = [];

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    window.document.title = 'Nieuwe sessie';
    console.log(this.participantEmail);
    this.themeService.getThemes().subscribe(
      themes => {
        this.themesArray = themes;
        console.log('Themes loaded' + themes[0].themename);
      }
    );
  }

  onClickSubmit() {
    if (this.model.chance === true || this.model.chance === false) {
      // POST met gegevens naar server
      this.submitted = true;
    }
  }

  chanceClicked() {
    if (this.model.chance === true && this.model.name !== '') {
      this.model.chance = null;
      this.chance = null;
    } else {
      this.model.chance = true;
      this.chance = true;
    }
  }

  problemClicked() {
    if (this.model.chance === false) {
      this.model.chance = null;
      this.chance = null;
    } else {
      this.model.chance = false;
      this.chance = false;
    }
  }

  addParticipant() {
    this.model.participants += this.participantEmail + '\n';
    this.participantEmail = null;
  }
}
