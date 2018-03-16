import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../../services/user.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewChecked {
  page_title = '';
  error_message = '';

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

  constructor(private userService: UserService, private  useridStorage: UseridStorage, private router: Router, private translate: TranslateService) {
    this.userId = this.useridStorage.getUserId();
  }

  ngOnInit() {
    this.translate.get('Kandoe.Users.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    });
    window.document.title = this.page_title;
    this.userService.getUser(this.useridStorage.getUserId()).subscribe(data => {
      this.user = data;
      this.pwHash = this.user.password;
      this.user.password = '';
    }, error => {
      this.translate.get('Kandoe.Users.error_read', {value: 'world'}).subscribe(e => {
        this.error_message = e;
      });
      console.error(this.error_message);
      console.log(error);
      alert(this.error_message);
    });
  }

  ngAfterViewChecked() {
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
      } else {
        this.ngOnInit();
      }
    }, error => {
      this.translate.get('Kandoe.Users.error_update', {value: 'world'}).subscribe(e => {
        this.error_message = e;
      });
      console.error(this.error_message);
      console.log(error);
      alert(this.error_message);
    });
  }
}
