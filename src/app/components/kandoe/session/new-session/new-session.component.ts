import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Session} from '../../../../model/session';
import {ThemeService} from '../../../../services/theme.service';
import {log} from 'util';
import {CategoryService} from '../../../../services/category.service';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {Theme} from '../../../../model/theme';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
export class NewSessionComponent implements OnInit {
  model = new Session(0, '', null, null, 1, 1, 0, '');
  submitted = false;
  chance = null;
  participantEmail = '';
  public themesArray = [];
  public categoryArray = [];
  public userId;
  public themeIndexId = 0;

  constructor(private themeService: ThemeService, private categoryService: CategoryService, private useridStorage: UseridStorage) {
    this.userId = useridStorage.getUserId();

  }

  ngOnInit() {
    window.document.title = 'Nieuwe sessie';
    console.log(this.participantEmail);
    this.themeService.getThemesOfUser(this.userId).subscribe(data => {
        this.themesArray = data;
      },
      error => {
        console.error('Error loading themes!');
        console.log(error);
        alert('Error loading themes');
      }, () => {
        this.setCategory();
        this.themesArray.reverse();
      });
  }

  compareFn(t1: Theme, t2: Theme): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

  setCategory() {
    this.categoryService.getCategoriesByTheme(this.themeIndexId, this.userId).subscribe(data => {
        this.categoryArray = data;
      },
      error => {
        console.error('Error loading themes!');
        console.log(error);
        alert('Error loading themes');
      });
  }

  onClickSubmit() {
    if (this.model.chance === true || this.model.chance === false) {
      // POST met gegevens naar server
      this.submitted = true;
    }
  }

  chanceClicked() {
    this.model.chance = true;
  }

  problemClicked() {
    this.model.chance = false;
  }

  addParticipant() {
    this.model.participants += this.participantEmail + '\n';
    this.participantEmail = null;
  }
}
