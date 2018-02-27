import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {TokenStorage} from '../../../token-storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService, private token: TokenStorage){
  }

  error:"";
  loading: false;
  usernametext: string;
  passwordtext: string;

  login(): void {
    this.authService.login(this.usernametext, this.passwordtext).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.router.navigate(['dashboard']); // naar dashboard
      }
    );
  }

  ngOnInit(): void {
  }


}
