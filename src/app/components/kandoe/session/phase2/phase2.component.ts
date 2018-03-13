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
  private sessionId;
  private session: Session;
  private userId;

  constructor(private route: ActivatedRoute,  private sessionService: SessionService, private useridStorage: UseridStorage) {
    this.userId = useridStorage.getUserId();
    this.sessionId = this.route.snapshot.params['sessionId'];
  }

  ngOnInit() {

    this.sessionService.getSession(this.sessionId, this.userId).subscribe(data => {
        this.session = data;
      },
      error => {
        console.error('Error loading sessions!');
        console.log(error);
      });
  }
}






