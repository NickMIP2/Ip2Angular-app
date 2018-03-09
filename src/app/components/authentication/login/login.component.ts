import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {TokenStorage} from '../../../sessionStorage/token-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService,UseridStorage,TokenStorage]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService, private userIdStorage: UseridStorage, private tokenStorage: TokenStorage){
  }

  error:'';
  loading: false;
  usernametext: string;
  passwordtext: string;


  login(): void {
    this.authService.login(this.usernametext, this.passwordtext).subscribe(
      data => {
        this.tokenStorage.saveToken(data.authToken);
        this.userIdStorage.saveUserId(data.userId);
        this.userIdStorage.saveUsername(data.username);
        this.router.navigate(['kandoe/dashboard']);
      },
      error => {
        console.error('Error logging in!');
        console.log(error);
        alert('Unable to login');
      });
  }

  ngOnInit(): void {

  }


}
