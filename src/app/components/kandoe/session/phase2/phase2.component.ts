import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from '../../../../services/session.service';
import {Session} from '../../../../model/session';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-phase2',
  templateUrl: './phase2.component.html',
  styleUrls: ['./phase2.component.css']
})
export class Phase2Component implements OnInit {
  public sessionId = 0;
  private userId;

  private stompClient;
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';

  public userTurn: boolean;

  public userOrganiser: boolean;
  public currentCardId;
  public session = new Session(0, '', 0, 0, 0, 0, 0, [''], [''], [], [], 0, [], null, false, new Date(), false, 0);


  constructor(private route: ActivatedRoute, private useridStorage: UseridStorage, private sessionService: SessionService) {

    this.sessionId = this.route.parent.snapshot.params['sessionId'];
    this.userId = this.useridStorage.getUserId();

  }

  ngOnInit() {

    this.sessionService.getSession(this.sessionId, this.userId).subscribe(data => {
        console.log(data);
        this.session = data;
        console.log(this.session);
        if (data.currentUser === this.userId) {
          this.userTurn = true;
        }
      },
      error => {
        console.error('Error loading Session!');
        console.log(error);
        alert('Error loading Session');
      });

  }
}


