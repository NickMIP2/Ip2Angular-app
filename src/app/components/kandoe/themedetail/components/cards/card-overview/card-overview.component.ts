import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../../../sessionStorage/userid-storage';
import {CardService} from '../../../../../../services/card.service';
import {ThemeService} from '../../../../../../services/theme.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrls: ['./card-overview.component.css']
})
export class CardOverviewComponent implements OnInit {
  page_title = '';
  error_message = '';

  public cards = [];
  public themeId;
  public categoryId;
  public userId;

  constructor(private cardService: CardService, private themeService: ThemeService, private route: ActivatedRoute, private userIdStorage: UseridStorage, private router: Router,
              private translate: TranslateService) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    this.translate.get('Kandoe.Themedetail.cards.overview.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    });
    window.document.title = this.page_title;
    this.themeId = this.route.parent.snapshot.params['themeId'];
    this.categoryId = this.route.snapshot.params['categoryId'];

    // get cards of category
    this.cardService.getCardsByCategory(this.categoryId ,this.themeId, this.userId).subscribe(data => {
        this.cards = data;
      },
      error => {
        this.translate.get('Kandoe.Themedetail.cards.overview.error_load_cards', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
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
        this.translate.get('Kandoe.Themedetail.cards.new.error_delete_cards', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });
  }

  navigateNewCard() {
    this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + this.categoryId + '/cards/new-card']);
  }

  editCard(id: number) {
    this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + this.categoryId + '/cards/' + id + '/edit-card']);

  }
}
