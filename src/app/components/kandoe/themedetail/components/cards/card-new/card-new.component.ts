import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../../../../services/theme.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../../../../services/category.service';
import {Card} from '../../../../../../model/card';
import {UseridStorage} from '../../../../../../sessionStorage/userid-storage';
import {CardService} from '../../../../../../services/card.service';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {ImageB64ConvertService} from '../../../../../../services/image-b64-convert.service';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.css']
})
export class CardNewComponent implements OnInit {

  title = '';
  error_message = '';
  public myfile: any;
  public card = new Card(0, 0, '', '', '');
  public oldCards = [];
  public themeId;
  public userId;
  public categoryId;
  public correctName = true;
  public check = false;
  public themeName;
  public categoryName;

  constructor(private themeService: ThemeService,
              private cardService: CardService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private userIdStorage: UseridStorage,
              private router: Router,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private imageb64Service: ImageB64ConvertService) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {

    this.translate.get('Kandoe.Themedetail.cards.new.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;

    this.themeId = this.route.parent.snapshot.params['themeId'];
    this.categoryId = this.route.snapshot.params['categoryId'];
    this.themeName = this.route.snapshot.queryParamMap.get('themeName');
    this.categoryName = this.route.snapshot.queryParamMap.get('categoryName');

    this.cardService.getCardsByCategory(this.categoryId , this.themeId, this.userId).subscribe(data => {
        this.oldCards = data;
      },
      error => {
        console.error('Error loading cards!');
        console.log(error);
        this.snackBar.open('Fout bij ophalen kaartjes', 'x', {duration: 2000});
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
        this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + this.categoryId + '/overview'], {queryParams: {themeName: this.themeName, categoryName: this.categoryName}});
      },
      error => {
        console.error('Error creating card!');
        console.log(error);
        this.snackBar.open('Fout bij aanmaken kaart', 'x', {duration: 2000});
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
    this.router.navigate(['kandoe/themes/' + this.themeId + '/cards'], {queryParams: {themeName: this.themeName, categoryName: this.categoryName}});
  }
}
