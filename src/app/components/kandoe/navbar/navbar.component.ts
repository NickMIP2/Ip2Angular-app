import {Component, OnInit} from '@angular/core';
import {UseridStorage} from '../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userId;

  constructor(private useridStorage: UseridStorage) {
    this.userId = this.useridStorage.getUserId();
  }

  ngOnInit() {
  }

}
