import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model = new User(0, '', '', '', '');
  username = '';
  password = '';
  passwordCheck = '';
  redirectUrl: string;
  error = '';
  loading = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit() {
    window.document.title = 'Register | Kandoe';
    this.userService.logout();
  }

  onClickRegister() {
    if (this.password === this.passwordCheck) {
      // POST TO USERSERVICE
      this.loading = true;
      this.authenticationService.register(this.model, this.password, this.username)
        .subscribe(
          result => {
            this.loading = false;
            if (result) {
              this.navigateAfterSuccess();
            } else {
              this.error = 'Registration failed';
            }
          }, error => {
            this.error = 'Registration failed';
            this.loading = false;
          }
        );
    }
  }

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
