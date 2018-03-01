import {AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {ThemeService} from '../../../../../../services/theme.service';
import {CardService} from '../../../../../../services/card.service';
import {CategoryService} from '../../../../../../services/category.service';
import {Card} from '../../../../../../model/card';
import {Theme} from '../../../../../../model/theme';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  @Input() cardId: number;
  public card: Card = {id: 0, themeId: 0, title: 'Missing', description: 'Oops, something went wrong!', image: '', categories: null};
  public theme: Theme;
  public categories = null;

  constructor(private themeService: ThemeService,
              private cardService: CardService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    window.document.title = 'Cardeditor';
    this.card = this.cardService.getCard(1);
    this.themeService.getTheme(1).subscribe(
      theme => {
        this.theme = theme;
      }
    );
    this.categories = this.categoryService.getCategoriesByTheme(1);
  }

}
