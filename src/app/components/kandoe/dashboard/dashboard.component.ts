import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SessionService} from '../../../services/session.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {Session} from '../../../model/session';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

  title = '';
  error_message = '';
  public oldSessions = [];
  public pastSessions = [];
  public currentSessions = [];
  public plannedSessions = [];
  private userId: number;
  private pollingSessions: any;

  constructor(private router: Router, private translate: TranslateService, titleService: Title, private sessionService: SessionService, private snackBar: MatSnackBar, private useridStorage: UseridStorage) {
    this.userId = useridStorage.getUserId();
  }

  ngOnInit() {

    this.translate.get('Kandoe.Dashboard.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;

    this.sessionService.getSessionsOfUser(this.userId).subscribe(data => {
        this.oldSessions = data;
      },
      error => {
        this.translate.get('Kandoe.Dashboard.error_message', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });

        this.snackBar.open(this.error_message, 'x', {duration: 2000});

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
        this.translate.get('Kandoe.Dashboard.error_message', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
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
        let highestPriority = 0;
        let winningCards = [];
        for (const card of session.sessionCardDtos) {
          if (card.priority > highestPriority) {
            highestPriority = card.priority;
          }
        }
        for (let card of session.sessionCardDtos) {
          if (card.priority === highestPriority) {
            winningCards.push(card.name);
          }
        }
        session.winningCard = winningCards;

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
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
    this.pollingSessions.unsubscribe();
  }
}
