import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../../../../services/theme.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../../../../services/category.service';
import {Card} from '../../../../../../model/card';
import {UseridStorage} from '../../../../../../sessionStorage/userid-storage';
import {CardService} from '../../../../../../services/card.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.css']
})
export class CardNewComponent implements OnInit {
  page_title = '';
  error_message = '';
  public myfile: any;
  public card = new Card(0, 0, '', '', '');
  public oldCards = [];
  public themeId;
  public userId;
  public categoryId;
  public correctName = true;
  public check = false;

  constructor(private themeService: ThemeService,
              private cardService: CardService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private userIdStorage: UseridStorage,
              private router: Router,
              private translate: TranslateService) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    this.translate.get('Kandoe.Themedetail.cards.new.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    });
    window.document.title = this.page_title;
    this.themeId = this.route.parent.snapshot.params['themeId'];
    this.categoryId = this.route.snapshot.params['categoryId'];

    this.cardService.getCardsByCategory(this.categoryId, this.themeId, this.userId).subscribe(data => {
        this.oldCards = data;
      },
      error => {
        this.translate.get('Kandoe.Themedetail.cards.new.error_cards', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });
  }

  checkName() {
    for (const card of this.oldCards) {
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

  createCard() {
    if (this.correctName) {
      this.cardService.createCard(this.categoryId, this.card, this.themeId, this.userId).subscribe(data => {
          this.card = data;
          this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + this.categoryId + '/overview']);
        },
        error => {
          this.translate.get('Kandoe.Themedetail.cards.new.error_cards_save', {value: 'world'}).subscribe(e => {
            this.error_message = e;
          });
          console.error(this.error_message);
          console.log(error);
          alert(this.error_message);
        });
    }
  }

  changeListener($event) {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.card.image = myReader.result.toString();
    };
    myReader.readAsDataURL(file);
  }

  navigateAbort() {
    this.router.navigate(['kandoe/themes/' + this.themeId + '/cards']);
  }
}
