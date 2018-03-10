import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SessionService} from '../../../services/session.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {Theme} from '../../../model/theme';
import {Session} from '../../../model/session';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'mytitle';
  public oldSessions: Set<Session> = new Set<Session>();
  public pastSessions: Set<Session> = new Set<Session>();
  public currentSessions: Set<Session> = new Set<Session>();
  public plannedSessions: Set<Session> = new Set<Session>();
  private userId;

  constructor(private titleService: Title, private sessionService: SessionService, private useridStorage: UseridStorage) {
    this.userId = useridStorage.getUserId();
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.sessionService.getSessionsOfUser(this.userId).subscribe(data => {
        this.oldSessions = data;
        console.log(this.oldSessions);
        this.divideSessions();
      },
      error => {
        console.error('Error loading sessions!');
        console.log(error);
      });
  }

  divideSessions() {
    for (const session of this.oldSessions) {
      if (session.state === 0) {
        this.plannedSessions.add(session);
      } else if (session.state === 1 || session.state === 2) {
        this.currentSessions.add(session);
      } else if (session.state === 3) {
        this.pastSessions.add(session);
      }
    }
  }
}
