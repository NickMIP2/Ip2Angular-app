import {Component, OnInit} from '@angular/core';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {TranslateService} from '@ngx-translate/core';
import {TokenStorage} from '../../../sessionStorage/token-storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userId;

  constructor(private useridStorage: UseridStorage, private router: Router, private tokenStorage: TokenStorage,
              private translate: TranslateService) {
    this.userId = this.useridStorage.getUserId();
  }

  ngOnInit() {
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }
}
