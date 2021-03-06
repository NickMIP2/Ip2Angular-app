import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../../../sessionStorage/userid-storage';
import {CardService} from '../../../../../../services/card.service';
import {ThemeService} from '../../../../../../services/theme.service';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {ImageB64ConvertService} from '../../../../../../services/image-b64-convert.service';


@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrls: ['./card-overview.component.css']
})
export class CardOverviewComponent implements OnInit {
  title = '';
  error_message = '';
  public themeName;
  public categoryName;
  public cards = [];
  public themeId;
  public categoryId;
  public userId;

  constructor(private cardService: CardService,
              private themeService: ThemeService,
              private route: ActivatedRoute,
              private userIdStorage: UseridStorage,
              private router: Router,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private imageb64convert: ImageB64ConvertService) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    this.translate.get('Kandoe.Themedetail.cards.overview.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;
    this.themeId = this.route.parent.snapshot.params['themeId'];
    this.categoryId = this.route.snapshot.params['categoryId'];
    this.themeName = this.route.snapshot.queryParamMap.get('themeName');
    this.categoryName = this.route.snapshot.queryParamMap.get('categoryName');

    // get cards of category
    this.cardService.getCardsByCategory(this.categoryId, this.themeId, this.userId).subscribe(data => {
        this.cards = data;
      },
      error => {
        this.snackBar.open('Fout bij ophalen kaartjes', 'x', {duration: 2000});

      });
    for (const card of this.cards) {
      card.image = this.imageb64convert.convert(card.image);
    }
  }

  deleteCard(id: number) {
    this.cardService.deleteCard(this.categoryId, id, this.userId, this.themeId).subscribe(data => {
        this.cards = data;
      },
      error => {
        this.snackBar.open('Fout bij verwijderen kaart', 'x', {duration: 2000});
      }, () => {
        this.snackBar.open('Verwijderen succesvol', 'x', {duration: 2000});

      });
  }

  navigateNewCard() {
    this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + this.categoryId + '/cards/new-card'], {queryParams: {themeName: this.themeName, categoryName: this.categoryName}});
  }

  navigateBack() {
    this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/'], {queryParams: {themeName: this.themeName, categoryName: this.categoryName}});
  }

  editCard(id: number) {
    this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + this.categoryId + '/cards/' + id + '/edit-card'], {queryParams: {themeName: this.themeName, categoryName: this.categoryName}});

  }
}
