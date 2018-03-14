import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from '../../../../services/session.service';
import {Session} from '../../../../model/session';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-phase2',
  templateUrl: './phase2.component.html',
  styleUrls: ['./phase2.component.css']
})
export class Phase2Component implements OnInit {
  public sessionId = 0;
  private userId;
  public userTurn: boolean;
  public userOrganiser: boolean;
  public session = new Session(0, '', 0, 0, 0, 0, 0, [''], [''], [], [], 0, [], null, false, new Date(), 0);


  constructor(private route: ActivatedRoute, private useridStorage: UseridStorage, private sessionService: SessionService) {

    this.sessionId = this.route.parent.snapshot.params['sessionId'];
    console.log('SESSION ID PHASE2:' + this.sessionId);
    this.userId = this.useridStorage.getUserId();

  }

  ngOnInit() {
    this.sessionService.getSession(this.sessionId, this.userId).subscribe(data => {
        this.session = data;
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


