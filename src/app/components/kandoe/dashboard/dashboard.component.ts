import {Component, OnInit} from '@angular/core';

import {Title} from '@angular/platform-browser';
import {SessionService} from '../../../services/session.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'mytitle';
  oldSessions = [];
  private userId;
  constructor(private titleService: Title, private sessionService: SessionService, private useridStorage: UseridStorage) {
    this.userId = useridStorage.getUserId();
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.sessionService.getSessionsOfUser(this.userId).subscribe(data => {
        this.oldSessions = data;
        console.log(this.oldSessions);
      },
      error => {
        console.error('Error loading sessions!');
        console.log(error);
      });
  }
}
