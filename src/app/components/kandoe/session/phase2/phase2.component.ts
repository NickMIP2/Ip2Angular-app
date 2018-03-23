import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from '../../../../services/session.service';
import {Session} from '../../../../model/session';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-phase2',
  templateUrl: './phase2.component.html',
  styleUrls: ['./phase2.component.css']
})
export class Phase2Component implements OnInit {
  public sessionId = 0;
  private userId;

  title = '';
  error_message = '';
  viewchat = false;
  private stompClient;
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';

  public userTurn: boolean;

  public userOrganiser = false;
  public currentCardId;
  public session = new Session(0, '', 0, 0, 0, 0, 0, [''], [''], [], [], 0, [], null, false, new Date(), false, 0, null, 0,[]);
  public sessionCards;

  constructor(private route: ActivatedRoute,
              private useridStorage: UseridStorage,
              private sessionService: SessionService,
              private snackBar: MatSnackBar,
              private translate: TranslateService) {

    this.sessionId = this.route.parent.snapshot.params['sessionId'];
    this.userId = this.useridStorage.getUserId();

  }

  ngOnInit() {
    this.translate.get('Kandoe.Session.p2.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;

    this.sessionService.getSession(this.sessionId, this.userId).subscribe(data => {
        this.session = data;

      },
      error => {
        this.snackBar.open('Fout bij ophalen sessie', 'x', {duration: 2000});
      }, () => {
        this.userOrganiser = (this.session.organisersIds.indexOf(this.userId) !== -1 );
        this.sessionCards = this.session.sessionCardDtos.sort((a, b) => a.id - b.id);

      });

  }

  togglechat(){
    this.viewchat = !this.viewchat;
  }
}


