import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../../../../services/theme.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../../../../services/category.service';
import {Card} from '../../../../../../model/card';
import {UseridStorage} from '../../../../../../sessionStorage/userid-storage';
import {CardService} from '../../../../../../services/card.service';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.css']
})
export class CardNewComponent implements OnInit {
  public myfile: any;
  public card = new Card(0, 0, '', '', '');
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
    window.document.title = 'Cardcreator';
    this.themeId = this.route.parent.snapshot.params['themeId'];
  }

  createCard() {
    this.cardService.createCard(this.card, this.themeId, this.userId).subscribe(data => {
        this.card = data;
        this.router.navigate(['kandoe/themes/' + this.themeId + '/cards']);
      },
      error => {
        console.error('Error creating card!');
        console.log(error);
        alert('Error creating card');
      });
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
