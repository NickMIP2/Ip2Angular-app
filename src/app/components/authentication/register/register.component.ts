import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthenticationService]

})
export class RegisterComponent implements OnInit {
  model = new User(0, '', '', '', '', '');
  passwordCheck = '';
  title = '';
  error_message = '';
  pwMatch: boolean = this.model.password === this.passwordCheck;
  loading = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.get('Authentication.Register.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;
  }

  register() {
    this.loading = true;
    this.authService.register(this.model).subscribe(
      data => {
        console.log('User succesfully registered');
        this.router.navigate(['/login']);
      },
      error => {
        this.translate.get('Authentication.Register.error_register', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });
  }

}
