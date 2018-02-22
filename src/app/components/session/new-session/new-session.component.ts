import { Component, OnInit } from '@angular/core';
import {Session} from '../../../model/session';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
export class NewSessionComponent implements OnInit {
  model = new Session(0, '', null, null, 0, 0, 0, 'testOwner');
  submitted = false;
  chance = null;
  participantEmail = '';

  constructor() { }

  ngOnInit() {
    window.document.title = 'Nieuwe sessie';
  }

  onClickSubmit() {
    if (this.model.chance === true || this.model.chance === false) {
      // POST met gegevens naar server
      this.submitted = true;
    }
  }

  chanceClicked() {
    this.model.chance = true;
    this.chance = true;
  }

  problemClicked() {
    this.model.chance = false;
    this.chance = false;
  }

  addParticipant() {
    this.model.participants += this.participantEmail + '\n';
    this.participantEmail = null;
  }
}
