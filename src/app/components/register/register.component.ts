import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

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
              ) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit() {
    window.document.title = 'Register | Kandoe';
  }

  onClickRegister() {
  }

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
