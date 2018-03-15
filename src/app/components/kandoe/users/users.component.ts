import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../../services/user.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {Router} from '@angular/router';

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

  constructor(private userService: UserService, private  useridStorage: UseridStorage, private router: Router) {
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
      alert('Error loading user');
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
        alert('Userdetails opgeslagen');
      } else {
        alert('Error updating user');
        this.ngOnInit();
      }
    }, error => {
      console.error('Error updating user!');
      console.log(error);
      alert('Error updating user');
    });
  }
}
