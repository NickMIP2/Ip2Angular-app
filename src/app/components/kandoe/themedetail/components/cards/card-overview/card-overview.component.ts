import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../../../sessionStorage/userid-storage';
import {CardService} from '../../../../../../services/card.service';
import {ThemeService} from '../../../../../../services/theme.service';

@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrls: ['./card-overview.component.css']
})
export class CardOverviewComponent implements OnInit {


  public cards = [];
  public themeId;
  public categoryId;
  public userId;

  constructor(private cardService: CardService, private themeService: ThemeService, private route: ActivatedRoute, private userIdStorage: UseridStorage, private router: Router) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    window.document.title = 'Kaarten';
    this.themeId = this.route.parent.snapshot.params['themeId'];
    this.categoryId = this.route.snapshot.params['categoryId'];

    // get cards of category
    this.cardService.getCardsByCategory(this.categoryId ,this.themeId, this.userId).subscribe(data => {
        this.cards = data;
      },
      error => {
        console.error('Error loading cards!');
        console.log(error);
        alert('Error loading cards!');
      });
    for (const card of this.cards) {
      console.log(card.image.substring(0, 30));
    }
  }

  deleteCard(id: number) {
    this.cardService.deleteCard(this.categoryId, id, this.userId, this.themeId).subscribe(data => {
        this.cards = data;
      },
      error => {
        console.error('Error deleting card!' + id);
        console.log(error);
        alert('Error deleting card!');
      });
  }

  navigateNewCard() {
    this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + this.categoryId + '/cards/new-card']);
  }

  editCard(id: number) {
    this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + this.categoryId + '/cards/' + id + '/edit-card']);

  }
}
