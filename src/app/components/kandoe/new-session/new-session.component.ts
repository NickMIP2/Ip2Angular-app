import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {CategoryService} from '../../../services/category.service';
import {Session} from '../../../model/session';
import {SessionType} from '../../../model/enum/sessiontype';
import {SessionState} from '../../../model/enum/sessionstate';
import {User} from '../../../model/user';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
export class NewSessionComponent implements OnInit {

  public newUser: User = {id: 0, email: '', password: '', username: '', firstname: '', lastname: '', organiser: ''};
  public users = [];
  public noneSelected = true;
  public stateEnum: SessionState;
  public typeEnum: SessionType;
  public themes = [];
  public newSession: Session = {
    id: 0,
    name: '',
    themeId: 0,
    maxCards: 0,
    timeForMove: 0,
    totalRounds: 0,
    categoryId: 0,
    sessionCardIds: [],
    participantIds: [],
    type: SessionType.CHANCE,
    state: SessionState.NOT_STARTED
  };
  public categories;
  private userToAdd: string;

  constructor(private themeService: ThemeService, private useridStorage: UseridStorage, private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.themeService.getThemesOfUser(this.useridStorage.getUserId()).subscribe(data => {
        this.themes = data;
      },
      error => {
        console.error('Error loading themes!');
        console.log(error);
        alert('Error loading themes');
      });
    console.log(this.newSession);
  }


  addNewUser() {
    this.userToAdd = this.newUser.email;
    this.users.push(this.userToAdd);
    this.newUser.email = '';
  }

  saveSession() {
    this.newSession.state = SessionState.NOT_STARTED;
    console.log(this.newSession);
  }

  // remove default option by setting noneSelected to false
  setSessionTheme(currentTheme) {
    this.noneSelected = false;
    this.newSession.themeId = currentTheme;
  }

}
