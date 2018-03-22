import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {SessionService} from '../../../../services/session.service';
import {Session} from '../../../../model/session';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-phase-review',
  templateUrl: './phase-review.component.html',
  styleUrls: ['./phase-review.component.css']
})
export class PhaseReviewComponent implements OnInit {

  public session = new Session(0, '', 0, 0, 0, 0, 0, [''], [''], [], [], 0, [], null, false, new Date(), false, 0, null, 0,[]);
  title = '';
  error_message = '';
  public sessionId = 0;
  private userId;
  public removedCards = [];
  public correctSessionCards = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private useridStorage: UseridStorage,
              private sessionService: SessionService,
              private snackBar: MatSnackBar,
              private translate: TranslateService) {

    this.sessionId = this.route.parent.snapshot.params['sessionId'];
    this.userId = this.useridStorage.getUserId();

  }

  ngOnInit() {
    this.translate.get('Kandoe.Session.review.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;

    this.sessionService.getSession(this.sessionId, this.userId).subscribe(data => {
        this.session = data;
      },
      error => {
        console.error('Error loading Session!');
        console.log(error);
        this.snackBar.open('Fout bij ophalen sessie', 'x', {duration: 2000});
      }, () => {
        for (const card of this.session.sessionCardDtos) {
          this.removedCards.push(false);
          this.correctSessionCards.push(card);
        }
      });
  }

  removeCard(card, id) {
    this.removedCards[id] = true;
    const temp = this.correctSessionCards.indexOf(card);
    this.correctSessionCards.splice(temp, 1);
  }

  saveSelection() {
    this.sessionService.saveReview(this.correctSessionCards, this.session.id, this.userId).subscribe(data => {
        this.router.navigate(['kandoe/sessions/' + this.sessionId + '/phase2']);
      },
      error => {
        console.error('Error saving selected cards!');
        console.log(error);
        this.snackBar.open('Fout bij opslaan geselecteerde kaartjes', 'x', {duration: 2000});
      });
  }

}
