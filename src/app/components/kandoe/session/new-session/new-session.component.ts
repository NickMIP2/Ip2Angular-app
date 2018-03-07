import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Session} from '../../../../model/session';
import {ThemeService} from '../../../../services/theme.service';
import {log} from 'util';
import {CategoryService} from '../../../../services/category.service';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {Theme} from '../../../../model/theme';
import {SessionService} from '../../../../services/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
export class NewSessionComponent implements OnInit {
  newSession = new Session(0, '', null, 0, 0, 1, 1, 0, []);
  participantEmail = '';
  public themesArray = [];
  public categoryArray = [];
  public userId;
  public themeIndexId;
  public categoryIndexId;

  constructor(private router: Router, private sessionService: SessionService, private themeService: ThemeService, private categoryService: CategoryService, private useridStorage: UseridStorage) {
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
        this.themeIndexId = this.themesArray.length;
        this.setCategory();
      });
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
    if (this.newSession.chance === true || this.newSession.chance === false) {
      this.newSession.themeId = this.themeIndexId;
      this.newSession.categoryId = this.categoryIndexId;
      this.sessionService.createSession(this.newSession, this.userId).subscribe(
        data => {
          this.router.navigate(['dashboard']);
        },
        error => {
          console.error('Error creating session!');
          console.log(error);
          alert('Error creating session');
        });
    }
  }

  chanceClicked() {
    this.newSession.chance = true;
  }

  problemClicked() {
    this.newSession.chance = false;
  }

  addParticipant() {
    if (this.newSession.participants.indexOf(this.participantEmail) === -1) {
      this.newSession.participants.push(this.participantEmail);
      this.participantEmail = '';
    } else {
      alert('E-mail al geselecteerd!');
    }
  }

  removeFromList(id) {
    this.newSession.participants.splice(id, 1);
  }
}
