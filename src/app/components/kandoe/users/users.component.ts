import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../../services/user.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewChecked {
  public user: User = {
    'id': 0,
    'email': '',
    'lastname': '',
    'firstname': '',
    'username': 'No user found',
    'password': '',
  };
  pwHash: any;
  public userId: number;

  constructor(private userService: UserService,
              private  useridStorage: UseridStorage,
              private router: Router,
              private snackBar: MatSnackBar,
              private translate: TranslateService) {
    this.userId = this.useridStorage.getUserId();
  }

  ngOnInit() {
    this.userService.getUser(this.useridStorage.getUserId()).subscribe(data => {
      this.user = data;
      this.pwHash = this.user.password;
      this.user.password = '';
    }, error => {
      console.error('Error loading user!');
      console.log(error);
      this.snackBar.open('Fout bij ophalen gebruiker', 'x', {duration: 2000});

    });
  }

  ngAfterViewChecked() {
    window.document.title = this.user.username + ' | Kandoe';
  }

  saveChanges() {
    if (this.user.password === '') {
      this.user.password = this.pwHash;
    }
    // POST naar backend
    this.userService.updateUser(this.user, this.userId).subscribe(data => {
      if (data !== null) {
        this.user = data;
        this.router.navigate(['kandoe/dashboard']);
        this.snackBar.open('Wijzigingen opgeslagen', 'x', {duration: 2000});
      } else {
        this.snackBar.open('Fout bij opslaan wijzigingen', 'x', {duration: 2000});
        this.ngOnInit();
      }
    }, error => {
      console.error('Error updating user!');
      console.log(error);
      this.snackBar.open('Fout bij opslaan wijzigingen', 'x', {duration: 2000});
    });
  }
}
