import {Component, OnInit} from '@angular/core';
import {CardService} from '../../../../../../services/card.service';
import {Card} from '../../../../../../model/card';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
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
              private router: Router) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    window.document.title = 'Cardeditor';
    this.themeId = this.route.parent.snapshot.params['themeId'];
    this.cardId = this.route.snapshot.params['cardId'];
    this.categoryId = this.route.snapshot.params['categoryId'];

    // get card
    this.cardService.getCard(this.categoryId, this.cardId, this.themeId, this.userId).subscribe(data => {
        this.card = data;
      },
      error => {
        console.error('Error loading card!');
        console.log(error);
        alert('Error loading card!');
      }, () => {
        this.cardService.getCardsByCategory(this.categoryId ,this.themeId, this.userId).subscribe(data => {
            this.oldCards = data;
          },
          error => {
            console.error('Error loading cards!');
            console.log(error);
            alert('Error loading cards!');
          }, () => {
            let index = 0;
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
          console.error('Error saving card!');
          console.log(error);
          alert('Error saving card');
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
