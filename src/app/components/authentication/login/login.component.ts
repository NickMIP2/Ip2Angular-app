import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {TokenStorage} from '../../../sessionStorage/token-storage';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, UseridStorage, TokenStorage]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService, private userIdStorage: UseridStorage,
              private tokenStorage: TokenStorage, private translate: TranslateService) {
  }
  title = '';
  loading = false;
  usernametext: string;
  passwordtext: string;
  errormessage = '';


  login(): void {
    this.loading = true;
    this.authService.login(this.usernametext, this.passwordtext).subscribe(
      data => {
        this.tokenStorage.saveToken(data.authToken);
        this.userIdStorage.saveUserId(data.userId);
        this.userIdStorage.saveUsername(data.username);
        this.router.navigate(['kandoe/dashboard']);
      },
      error => {
        this.translate.get('Authentication.Login.error_login', {value: 'world'}).subscribe(e => {
          this.errormessage = e;
        })
        console.error(this.errormessage);
        console.log(error);
        alert(this.errormessage);
        this.passwordtext = '';
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.translate.get('Authentication.Login.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;
  }


}
