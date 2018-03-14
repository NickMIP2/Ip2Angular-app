import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../../services/user.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';

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

  constructor(private userService: UserService, private  useridStorage: UseridStorage) {
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
    this.userService.updateUser(this.user).subscribe(data => {
      if (data !== null) {
        this.user = data;
        this.user.password = '';
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
