import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorage} from '../../sessionStorage/token-storage';
import {AuthenticationService} from '../../services/authentication.service';
import {UseridStorage} from '../../sessionStorage/userid-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, TokenStorage]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService, private tokenStorage: TokenStorage, private userIdStorage: UseridStorage){
  }

  error:"";
  loading: false;
  usernametext: string;
  passwordtext: string;


  login(): void {
    this.authService.login(this.usernametext, this.passwordtext).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.userIdStorage.saveUserId(data.userId);
        this.router.navigate(['dashboard']);
      },
      error => {
        console.error("Error logging in!");
        console.log(error);
        alert("Unable to login");
      });
  }

  ngOnInit(): void {
  }


}
