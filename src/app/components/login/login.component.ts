import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorage} from '../../token-storage';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, TokenStorage]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService, private tokenStorage: TokenStorage){
  }

  error:"";
  loading: false;
  usernametext: string;
  passwordtext: string;

  register(){
    this.authService.register().subscribe(
      data => {
        console.log("User succesfully registered");
      },
      error => {
        console.error("Error registering User!");
        console.log(error);
        alert("Unable to register User");
      });
  }

  login(): void {
    this.authService.login(this.usernametext, this.passwordtext).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.router.navigate(['dashboard']);
      }
    );
  }

  ngOnInit(): void {
  }


}
