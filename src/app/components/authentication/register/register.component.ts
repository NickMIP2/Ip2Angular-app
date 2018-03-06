import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthenticationService]

})
export class RegisterComponent implements OnInit {
  model = new User(0, '', '', '', '', '', '');
  passwordCheck = '';
  error = '';
  loading = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService,
              ) {
  }

  ngOnInit() {
    window.document.title = 'Register | Kandoe';
  }

  register(){
    this.authService.register(this.model).subscribe(
      data => {
        console.log("User succesfully registered");
        this.router.navigate(['/login']);
      },
      error => {
        console.error("Error registering User!");
        console.log(error);
        alert("Unable to register User");
      });
  }

}
