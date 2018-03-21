import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SessionService} from '../../../services/session.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {Session} from '../../../model/session';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

  title = 'Dashboard';
  // public oldSessions: Set<Session> = new Set<Session>();
  public oldSessions = [];
  public pastSessions = [];
  public currentSessions = [];
  public plannedSessions = [];
  private userId: number;
  private pollingSessions: any;

  constructor(private router: Router, private titleService: Title, private sessionService: SessionService, private useridStorage: UseridStorage) {
    this.userId = useridStorage.getUserId();
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.sessionService.getSessionsOfUser(this.userId).subscribe(data => {
        this.oldSessions = data;
      },
      error => {
        console.error('Error loading sessions!');
        console.log(error);
      },
      () => {
        console.log(this.oldSessions);
        this.divideSessions();
      });

    this.pollingSessions = Observable.interval(5000).subscribe(() =>
      this.sessionService.getSessionsOfUser(this.userId).subscribe(data => {
        this.oldSessions = data;
        this.pastSessions = [];
        this.currentSessions = [];
        this.plannedSessions = [];
        this.divideSessions();
        console.log(data);
      }, error => {
        console.error('Error loading sessions!');
        console.log(error);
      }));
  }

  divideSessions() {
    this.oldSessions.sort((a, b) => a.id - b.id);
    for (const session of this.oldSessions) {
      if (session.state === 0) {
        this.plannedSessions.push(session);
      } else if (session.state === 1 || session.state === 2 || session.state === 3) {
        this.currentSessions.push(session);
      } else if (session.state === 4) {
        this.pastSessions.push(session);
      }
    }
  }

  startSession(session: Session) {
    this.sessionService.startSession(session.id, this.userId).subscribe();
    this.router.navigate(['kandoe/sessions/' + session.id + '/phase1']);
  }

  continueSession(session) {
    if (session.state === 1) {
      this.router.navigate(['kandoe/sessions/' + session.id + '/phase1']);
    } else if (session.state === 3) {
      this.router.navigate(['kandoe/sessions/' + session.id + '/phase2']);
    }
  }

  reviewSession(session) {
    this.router.navigate(['kandoe/sessions/' + session.id + '/phaseReview']);
  }

  viewSnapshots(session) {
    this.router.navigate(['kandoe/sessions/' + session.id + '/snapshots']);
  }

  showOrganiserButton(session: Session) {
    const organiserIds = session.organisersIds;
    if (organiserIds.indexOf(this.userId) === -1) {
      return false;
    } else return true;
  }

  ngOnDestroy(): void {
    this.pollingSessions.unsubscribe();
  }
}
