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
  model = new Session(0, '', null, null, 1, 1, 0, 'testOwner\n');
  submitted = false;
  chance = null;
  participantEmail = '';
  public themesArray = [];

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    window.document.title = 'Nieuwe sessie';
    console.log(this.participantEmail);

  }

  onClickSubmit() {
    if (this.model.chance === true || this.model.chance === false) {
      // POST met gegevens naar server
      this.submitted = true;
    }
  }

  chanceClicked() {
    this.model.chance = true;
  }

  problemClicked() {
    this.model.chance = false;
  }

  addParticipant() {
    this.model.participants += this.participantEmail + '\n';
    this.participantEmail = null;
  }
}
