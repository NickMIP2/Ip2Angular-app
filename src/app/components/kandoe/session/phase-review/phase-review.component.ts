import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {SessionService} from '../../../../services/session.service';
import {Session} from '../../../../model/session';

@Component({
  selector: 'app-phase-review',
  templateUrl: './phase-review.component.html',
  styleUrls: ['./phase-review.component.css']
})
export class PhaseReviewComponent implements OnInit {

  public session = new Session(0, '', 0, 0, 0, 0, 0, [''], [''], [], [], 0, [], null, false, new Date(), false, 0, null, 0);
  public sessionId = 0;
  private userId;
  public removedCards = [];
  public correctSessionCards = [];

  constructor(private router: Router, private route: ActivatedRoute, private useridStorage: UseridStorage, private sessionService: SessionService) {

    this.sessionId = this.route.parent.snapshot.params['sessionId'];
    this.userId = this.useridStorage.getUserId();

  }

  ngOnInit() {
    this.sessionService.getSession(this.sessionId, this.userId).subscribe(data => {
        this.session = data;
      },
      error => {
        console.error('Error loading Session!');
        console.log(error);
        alert('Error loading Session');
      }, () => {
        for (let card of this.session.sessionCardDtos) {
          this.removedCards.push(false);
          this.correctSessionCards.push(card);
        }
      });
  }

  removeCard(card, id) {
    this.removedCards[id] = true;
    let temp = this.correctSessionCards.indexOf(card);
    this.correctSessionCards.splice(temp, 1);
  }

  saveSelection() {
    this.sessionService.saveReview(this.correctSessionCards, this.session.id, this.userId).subscribe(data => {
        this.router.navigate(['kandoe/sessions/' + this.sessionId + '/phase2']);
      },
      error => {
        console.error('Error saving selected cards!');
        console.log(error);
        alert('Error saving selected cards');
      });
  }

}
