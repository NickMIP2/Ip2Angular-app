import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Session} from '../../../../model/session';
import {ThemeService} from '../../../../services/theme.service';
import {log} from 'util';
import {CategoryService} from '../../../../services/category.service';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {Theme} from '../../../../model/theme';
import {SessionService} from '../../../../services/session.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
export class NewSessionComponent implements OnInit {

  newSession = new Session(0, '', null, 1, 1, null, 1, [], [], [], [], 0, [], 0, false, new Date(), false, 0, null, 0);
  participantEmail = '';
  public themes = [];
  public categoryArray = [];
  public userId;
  public themeIndexId;
  public categoryIndexId;
  public oldSessions = [];
  public oldSession;
  public isOrganiser: boolean;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 20;
  maxTime = 100;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  vertical = false;
  showClone = false;
  title = '';
  error_message = '';

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }

  set tickInterval(v) {
    this._tickInterval = Number(v);
  }

  private _tickInterval = 1;

  constructor(private router: Router, private sessionService: SessionService, private themeService: ThemeService,
              private categoryService: CategoryService,
              private useridStorage: UseridStorage,
              private snackBar: MatSnackBar,
              private translate: TranslateService) {
    this.userId = useridStorage.getUserId();
  }

  cloneSession() {
    this.newSession = this.oldSession;

    this.newSession.id = 0;
    this.newSession.startDate = new Date();
    this.categoryIndexId = this.oldSession.categoryId;
    this.themeIndexId = this.oldSession.themeId;
    this.newSession.participantIds = [];
    this.newSession.organisersIds = [];
    this.newSession.organisers = [];
    this.newSession.sessionCardDtos = [];
    this.newSession.state = 0;
    this.newSession.userSubmitted = false;
    this.newSession.currentUserId = 0;
    this.newSession.snapshotDtos = null;
    this.newSession.amountSubmitted = 0;
    this.setCategory();
  }

  ngOnInit() {
    this.translate.get('Kandoe.Session.New.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;
    console.log(this.participantEmail);
    this.themeService.getThemesOfUser(this.userId).subscribe(data => {
        this.themes = data;
      },
      error => {
        console.error('Error loading themes!');
        console.log(error);
        this.snackBar.open('Fout bij ophalen themas', 'x', {duration: 2000});
      }, () => {
        // this.setCategory();
      });
    this.sessionService.getSessionsOfUser(this.userId).subscribe(data => {
        this.oldSessions = data;
        console.log(this.oldSessions);
      },
      error => {
        console.error('Error loading sessions!');
        console.log(error);
        this.snackBar.open('Fout bij ophalen sessies', 'x', {duration: 2000});

      });
  }


  setCategory() {
    this.categoryService.getCategoriesByTheme(this.themeIndexId, this.userId).subscribe(data => {
        this.categoryArray = data;
      },
      error => {
        console.error('Error loading categories!');
        console.log(error);
        this.snackBar.open('Fout bij ophalen categorieën', 'x', {duration: 2000});
      });
  }

  onClickSubmit() {
    this.newSession.startDate.toUTCString();
    if (this.newSession.type === 0 || this.newSession.type === 1) {
      this.newSession.themeId = this.themeIndexId;
      console.log(this.categoryIndexId);
      if (!(typeof this.categoryIndexId === 'string') && this.categoryIndexId != null && this.categoryIndexId !== undefined) {
        this.newSession.categoryId = this.categoryIndexId;
      } else {
        this.newSession.categoryId = 0;
      }
      this.newSession.id = 0;
      this.sessionService.createSession(this.newSession, this.userId).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['kandoe/dashboard']);
        },
        error => {
          console.error('Error creating session!');
          console.log(error);
          this.snackBar.open('Fout bij aanmaken van sessie', 'x', {duration: 2000});
        });
    }
  }

  addParticipant() {
    if (this.newSession.participants.indexOf(this.participantEmail) === -1) {
      this.newSession.participants.push(this.participantEmail);
      if (this.isOrganiser) {
        this.newSession.organisers.push(this.participantEmail);
      }
      this.participantEmail = '';
    } else {
      alert('E-mail al geselecteerd!');
    }
  }

  checkIfOrganiser(value: boolean, participant: string, id: number) {
    if (value) {
      if (this.newSession.participants.indexOf(this.participantEmail) === -1) {
        this.newSession.organisers.push(participant);
      }
    } else {
      this.newSession.organisers = this.newSession.organisers.filter(e => e !== participant);
    }
  }

  removeFromList(id: number, participant: string) {
    this.newSession.participants.splice(id, 1);
    this.newSession.organisers = this.newSession.organisers.filter(e => e !== participant);
  }
}

