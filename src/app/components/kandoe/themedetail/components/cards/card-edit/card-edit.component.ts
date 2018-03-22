import {Component, OnInit} from '@angular/core';
import {CardService} from '../../../../../../services/card.service';
import {Card} from '../../../../../../model/card';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../../../sessionStorage/userid-storage';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  title = '';
  error_message = '';
  public cardId;
  public card = new Card(0, 0, '', '', '');
  public themeId;
  public userId;
  public categoryId;
  public correctName = true;
  public check = false;
  public oldCards = [];
  public themeName;
  public categoryName;

  constructor(private cardService: CardService,
              private route: ActivatedRoute,
              private userIdStorage: UseridStorage,
              private router: Router,
              private snackBar: MatSnackBar,
              private translate: TranslateService) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    this.translate.get('Kandoe.Themedetail.cards.edit.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;

    this.themeId = this.route.parent.snapshot.params['themeId'];
    this.cardId = this.route.snapshot.params['cardId'];
    this.categoryId = this.route.snapshot.params['categoryId'];
    this.themeName = this.route.snapshot.queryParamMap.get('themeName');
    this.categoryName = this.route.snapshot.queryParamMap.get('categoryName');

    // get card
    this.cardService.getCard(this.categoryId, this.cardId, this.themeId, this.userId).subscribe(data => {
        this.card = data;
      },
      error => {
        console.error('Error loading card!');
        console.log(error);
        this.snackBar.open('Fout bij ophalen kaart', 'x', {duration: 2000});
      }, () => {
        this.cardService.getCardsByCategory(this.categoryId, this.themeId, this.userId).subscribe(data => {
            this.oldCards = data;
          },
          error => {
            console.error('Error loading cards!');
            console.log(error);
            this.snackBar.open('Fout bij ophalen kaartjes!', 'x', {duration: 2000});

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
          this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + this.categoryId + '/overview'], {queryParams: {themeName: this.themeName, categoryName: this.categoryName}});
        },
        error => {
          console.error('Error saving card!');
          console.log(error);
          this.snackBar.open('Fout bij opslaan wijzigingen', 'x', {duration: 2000});
        }, () => {
          this.snackBar.open('Wijzigingen opgeslagen', 'x', {duration: 2000});
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
    this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + this.categoryId + '/overview'], {queryParams: {themeName: this.themeName, categoryName: this.categoryName}});
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
