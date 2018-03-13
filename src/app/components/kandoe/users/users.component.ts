import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public user: User = {'id': 0, 'email': 'diddenquinten@kandoe.com', 'lastname': 'Didden', 'firstname': 'Quinten', 'username': 'QuintenKandoe', 'password': 'QuintenPass', 'organiser': 'Organiser'};
  editing = false;
  constructor() {
  }

  ngOnInit() {
  }

  saveChanges() {
    this.editing = false;
  }

  goToEdit() {
    this.editing = true;
  }

  cancelChanges() {
    this.editing = false;
  }
}
