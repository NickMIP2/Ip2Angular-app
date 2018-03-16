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
  error = '';
  pwMatch: boolean = this.model.password === this.passwordCheck;
  loading = false;
  page_title = '';
  error_register = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.get('Authentication.Register.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    })
    window.document.title = this.page_title;
  }

  register() {
    this.loading = true;
    this.authService.register(this.model).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      error => {
        this.translate.get('Authentication.Register.error_register', {value: 'world'}).subscribe(e => {
          this.error_register = e;
        })
        console.error(this.error_register);
        console.log(error);
        alert(this.error_register);
      });
  }

}
