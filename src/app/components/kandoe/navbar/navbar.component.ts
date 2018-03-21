import {Component, OnInit} from '@angular/core';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userId;

  constructor(private useridStorage: UseridStorage,
              private translate: TranslateService) {
    this.userId = this.useridStorage.getUserId();
  }

  ngOnInit() {
  }

}
