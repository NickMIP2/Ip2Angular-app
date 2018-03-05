import {AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {ThemeService} from '../../../../../../services/theme.service';
import {CardService} from '../../../../../../services/card.service';
import {CategoryService} from '../../../../../../services/category.service';
import {Card} from '../../../../../../model/card';
import {Theme} from '../../../../../../model/theme';
import {ActivatedRoute, Params} from '@angular/router';
import {UseridStorage} from '../../../../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  @Input() cardId: number;
  public card: Card = {id: 0, themeId: 0, title: 'No card found.', description: 'Oops, something went wrong!', image: '', categories: null};
  public themeId;
  public userId;
  public categories = null;
  public theme: Theme = {
    id: 0,
    name: 'Oeps',
    description: 'Er ging iets fout bij het ophalen van dit thema, probeer opnieuw',
    tags: ['']
  };

  constructor(private themeService: ThemeService,
              private cardService: CardService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private userIdStorage: UseridStorage) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    window.document.title = 'Cardeditor';
    this.card = this.cardService.getCard(this.cardId);
    this.themeId = this.route.parent.params.forEach((params: Params) => {
      this.themeId = +params['themeId'];
      this.themeService.getTheme(this.themeId, this.userIdStorage.getUserId()).subscribe(theme => {
        this.theme = theme;
      });
      console.log(this.themeId + ' theme id');
      this.categories = this.categoryService.getCategoriesByTheme(this.themeId, this.userId);
    });

  }

}
