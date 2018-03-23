import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {SessionService} from '../../../../services/session.service';
import {CardService} from '../../../../services/card.service';
import {Session} from '../../../../model/session';
import {Card} from '../../../../model/card';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-phase1',
  templateUrl: './phase1.component.html',
  styleUrls: ['./phase1.component.css']
})
export class Phase1Component implements OnInit {
  title = '';
  error_message = '';
  public userId;
  public sessionId;
  public session = new Session(0, '', 0, 0, 0, 0, 0, [''], [''], [], [], 0, [], null, false, new Date(), false, 0, null, 0,[]);
  public cards = [];
  public selectedCards = [];
  public buttonStates = [];
  public editing = 0;
  public card = new Card(0, 0, '', '', '');
  public correctName = true;
  public check = false;

  constructor(private router: Router,
              private cardService: CardService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private useridStorage: UseridStorage,
              private translate: TranslateService,
              private snackBar: MatSnackBar) {
    this.userId = useridStorage.getUserId();
    this.sessionId = this.route.parent.snapshot.params['sessionId'];
  }

  ngOnInit() {
    this.translate.get('Kandoe.Session.p1.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;

    this.sessionService.getSession(this.sessionId, this.userId).subscribe(data => {
        this.session = data;
      },
      error => {
        this.snackBar.open('Fout bij ophalen berichten', 'x', {duration: 2000});

      }, () => {
        this.cardService.getCardsByCategory(this.session.categoryId, this.session.themeId, this.userId).subscribe(data => {
            this.cards = data;
          },
          error => {
            this.snackBar.open('Fout bij ophalen sessies', 'x', {duration: 2000});

          }, () => {
            this.fillButtonStates();
          });
      });
  }

  fillButtonStates() {
    for (const card of this.cards) {
      this.buttonStates.push(false);
    }
  }

  selectCard(card, index) {
    this.selectedCards.push(card);
    this.buttonStates[index] = true;
  }

  deselectCard(card, index) {
    const cardIndex = this.selectedCards.indexOf(card);
    if (cardIndex > -1) {
      this.selectedCards.splice(cardIndex, 1);
    }
    this.buttonStates[index] = false;
  }

  saveCards() {
    this.sessionService.saveSessionCards(this.selectedCards, this.session.id, this.userId).subscribe(data => {
        this.router.navigate(['kandoe/dashboard']);
      },
      error => {
        this.snackBar.open('Fout bij ophalen sessies', 'x', {duration: 2000});
      });
  }

  createCard() {
    this.editing = 0;
    this.cards.push(this.card);
    this.card = new Card(0, 0, '', '', '');
  }

  navigateAbort() {
    this.editing = 0;
    this.card = new Card(0, 0, '', '', '');
  }

  checkName() {
    for (const card of this.cards) {
      if (card.name === this.card.name) {
        this.correctName = false;
        this.check = true;
      }
    }
    if (!this.check) {
      this.correctName = true;
    }
    this.check = false;
  }
}
