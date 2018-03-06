import {AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {ThemeService} from '../../../../../../services/theme.service';
import {CardService} from '../../../../../../services/card.service';
import {CategoryService} from '../../../../../../services/category.service';
import {Card} from '../../../../../../model/card';
import {Theme} from '../../../../../../model/theme';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UseridStorage} from '../../../../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  @Input() cardId: number;
  public card: Card;
  public themeId;
  public userId;

  constructor(private themeService: ThemeService,
              private cardService: CardService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private userIdStorage: UseridStorage,
              private router: Router) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    window.document.title = 'Cardeditor';
    this.themeId = this.route.parent.snapshot.params['themeId'];
    // get card
    this.cardService.getCard(this.cardId, this.themeId, this.userId).subscribe(data => {
        this.card = data;
      },
      error => {
        console.error('Error loading card!');
        console.log(error);
        alert('Error loading card!');
      });
  }

  updateCard() {
    this.cardService.updateCard(this.card, this.themeId, this.userId).subscribe(data => {
        this.card = data;
        this.router.navigate(['themes/' + this.themeId + '/cards']); // id van teruggekregen thema
      },
      error => {
        console.error('Error saving card!');
        console.log(error);
        alert('Error saving card');
      });
  }
}
