import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SessionService} from '../../../services/session.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {Session} from '../../../model/session';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  page_title =  '';
  error_message = '';
  // public oldSessions: Set<Session> = new Set<Session>();
  public oldSessions = [];
  public pastSessions = [];
  public currentSessions = [];
  public plannedSessions = [];
  private userId;

  constructor(private router: Router, private titleService: Title, private sessionService: SessionService
              , private useridStorage: UseridStorage, private translate: TranslateService) {
    this.userId = useridStorage.getUserId();
  }

  ngOnInit() {
    this.translate.get('Kandoe.Dashboard.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    });
    window.document.title = this.page_title;

    this.titleService.setTitle(this.page_title);
    this.sessionService.getSessionsOfUser(this.userId).subscribe(data => {
        this.oldSessions = data;
      },
      error => {
        this.translate.get('Kandoe.Dashboard.error_message', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      },
      () => {
        console.log(this.oldSessions);
        this.divideSessions();
      });
  }

  divideSessions() {
    for (const session of this.oldSessions) {
      if (session.state === 0) {
        this.plannedSessions.push(session);
      } else if (session.state === 1 || session.state === 2) {
        this.currentSessions.push(session);
      } else if (session.state === 3) {
        this.pastSessions.push(session);
      }
    }
  }

  continueSession(session) {
    if (session.state === 1) {
      this.router.navigate(['kandoe/sessions/' + session.id + '/phase1']);
    } else {
      this.router.navigate(['kandoe/sessions/' + session.id + '/phase2']);
    }
  }
}
