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
      });
  }

  updateCard() {
    console.log('cardName: ' + this.card.name + '; image: ');

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
}
