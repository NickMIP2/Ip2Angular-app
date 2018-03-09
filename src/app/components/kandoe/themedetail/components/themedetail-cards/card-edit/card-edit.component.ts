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
