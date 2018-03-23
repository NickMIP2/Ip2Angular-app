import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {TokenStorage} from '../../../sessionStorage/token-storage';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, UseridStorage, TokenStorage]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthenticationService,
              private userIdStorage: UseridStorage,
              private tokenStorage: TokenStorage,
              private translate: TranslateService,
              private snackBar: MatSnackBar) {
  }

  title = '';
  error_message = '';

  loading = false;
  usernametext: string;
  passwordtext: string;


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
          this.error_message = e;
        });
        this.loading = false;
        this.snackBar.open(this.error_message, 'x', {duration: 2000});

      });
  }

  ngOnInit(): void {
    this.translate.get('Authentication.Login.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;
  }


}
