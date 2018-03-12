import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {SessionService} from '../../../../services/session.service';
import {ThemeService} from '../../../../services/theme.service';
import {CategoryService} from '../../../../services/category.service';
import {CardService} from '../../../../services/card.service';
import {Session} from '../../../../model/session';

@Component({
  selector: 'app-phase1',
  templateUrl: './phase1.component.html',
  styleUrls: ['./phase1.component.css']
})
export class Phase1Component implements OnInit {

  public userId;
  public sessionId;
  public session = new Session(0, '', 0, 0, 0, 0, 0, [''], [0], 0, [0], 0, false);
  public cards = [];
  public selectedCardIds = [];
  public buttonStates = [];
  constructor(private router: Router, private cardService: CardService, private route: ActivatedRoute, private sessionService: SessionService, private useridStorage: UseridStorage) {
    this.userId = useridStorage.getUserId();
    this.sessionId = this.route.parent.snapshot.params['sessionId'];
  }

  ngOnInit() {
    window.document.title = 'Fase 1';
    this.sessionService.getSession(this.sessionId, this.userId).subscribe(data => {
        this.session = data;
      },
      error => {
        console.error('Error loading session!');
        console.log(error);
        alert('Error loading session');
      }, () => {
        this.cardService.getCardsByCategory(this.session.categoryId, this.session.themeId, this.userId).subscribe(data => {
            this.cards = data;
          },
          error => {
            console.error('Error loading cards!');
            console.log(error);
            alert('Error loading cards');
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
    this.selectedCardIds.push(card.id);
    this.buttonStates[index] = true;
  }

  deselectCard(card, index) {
    let cardIndex = this.selectedCardIds.indexOf(card.id);
    if (cardIndex > -1) {
      this.selectedCardIds.splice(cardIndex, 1);
    }
    this.buttonStates[index] = false;
  }

  saveCardIds() {
    this.sessionService.saveSessionCards(this.selectedCardIds, this.session.id, this.userId).subscribe(data => {
        this.router.navigate(['kandoe/dashboard']);
      },
      error => {
        console.error('Error saving selected cards!');
        console.log(error);
        alert('Error saving selected cards');
      });
  }
}
