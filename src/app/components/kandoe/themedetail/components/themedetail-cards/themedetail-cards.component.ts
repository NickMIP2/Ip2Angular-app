import {Component, OnInit} from '@angular/core';
import {Card} from '../../../../../model/card';
import {Category} from '../../../../../model/category';
import {Theme} from '../../../../../model/theme';
import {ThemeService} from '../../../../../services/theme.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../../sessionStorage/userid-storage';
import {CardService} from '../../../../../services/card.service';

@Component({
  selector: 'app-themedetail-cards',
  templateUrl: './themedetail-cards.component.html',
  styleUrls: ['./themedetail-cards.component.css']
})
export class ThemedetailCardsComponent implements OnInit {

  public cards = [];
  public themeId;
  public userId;

  constructor(private cardService: CardService, private themeService: ThemeService, private route: ActivatedRoute, private userIdStorage: UseridStorage, private router: Router) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    window.document.title = 'Kaarten';
    this.themeId = this.route.parent.snapshot.params['themeId'];
    // get cards of theme
    this.cardService.getCardsByTheme(this.themeId, this.userId).subscribe(data => {
        this.cards = data;
      },
      error => {
        console.error('Error loading cards!');
        console.log(error);
        alert('Error loading cards!');
      });
  }

  deleteCard(id: number) {
    this.cardService.deleteCard(id, this.userId, this.themeId).subscribe(data => {
        this.cards = data;
      },
      error => {
        console.error('Error deleting card!' + id);
        console.log(error);
        alert('Error deleting card!');
      });
  }
}
