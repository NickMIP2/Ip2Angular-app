import {Component, OnInit} from '@angular/core';
import {CardService} from '../../../../../../services/card.service';
import {Card} from '../../../../../../model/card';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../../../sessionStorage/userid-storage';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  page_title = '';
  error_message = '';
  public cardId;
  public card = new Card(0, 0, '', '', '');
  public themeId;
  public userId;
  public categoryId;
  public correctName = true;
  public check = false;
  public oldCards = [];

  constructor(private cardService: CardService,
              private route: ActivatedRoute,
              private userIdStorage: UseridStorage,
              private router: Router,
              private translate: TranslateService) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    this.translate.get('Kandoe.Themedetail.cards.edit.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    });
    window.document.title = this.page_title;
    this.themeId = this.route.parent.snapshot.params['themeId'];
    this.cardId = this.route.snapshot.params['cardId'];
    this.categoryId = this.route.snapshot.params['categoryId'];

    // get card
    this.cardService.getCard(this.categoryId, this.cardId, this.themeId, this.userId).subscribe(data => {
        this.card = data;
      },
      error => {
        this.translate.get('Kandoe.Themedetail.cards.edit.error_cards', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      }, () => {
        this.cardService.getCardsByCategory(this.categoryId , this.themeId, this.userId).subscribe(data => {
            this.oldCards = data;
          },
          error => {
            this.translate.get('Kandoe.Themedetail.cards.edit.error_cards', {value: 'world'}).subscribe(e => {
              this.error_message = e;
            });
            console.error(this.error_message);
            console.log(error);
            alert(this.error_message);
          }, () => {
            const index = 0;
            for (let i = 0; i < this.oldCards.length; i++) {
              if (this.oldCards[i].name === this.card.name) {

              }
            }
            this.oldCards.splice(index, 1);
          });
      });
  }

  updateCard() {
    console.log('cardName: ' + this.card.name + '; image: ');
    if (this.correctName) {
      this.cardService.updateCard(this.categoryId, this.card, this.themeId, this.userId).subscribe(data => {
          this.card = data;
          this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + this.categoryId + '/overview']);
        },
        error => {
          this.translate.get('Kandoe.Themedetail.cards.edit.error_save_cards', {value: 'world'}).subscribe(e => {
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
      this.card.image = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  discardChanges() {
    this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + this.categoryId + '/overview']);
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
}
