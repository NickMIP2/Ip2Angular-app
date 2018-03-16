import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from '../../../../services/session.service';
import {Session} from '../../../../model/session';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-phase2',
  templateUrl: './phase2.component.html',
  styleUrls: ['./phase2.component.css']
})
export class Phase2Component implements OnInit {
  page_title = '';
  error_message = '';
  private sessionId;
  private userId;
  public userTurn: boolean;
  public session = new Session(0, '', 0, 0, 0, 0, 0, [''], [''], [], [], 0, [], null, false, new Date(), false, 0);


  constructor(private route: ActivatedRoute, private useridStorage: UseridStorage, private sessionService: SessionService, private translate: TranslateService) {
    this.sessionId = this.route.snapshot.params['sessionId'];
    this.userId = this.useridStorage.getUserId();

  }

  ngOnInit() {
    this.translate.get('Kandoe.Session.p2.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    });
    window.document.title = this.page_title;
    this.sessionService.getSession(this.sessionId, this.userId).subscribe(data => {
        this.session = data;
        if (data.currentUser === this.userId) {
          this.userTurn = true;
        }
      },
      error => {
        this.translate.get('Kandoe.Session.p2.error_session', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });

  }


}


