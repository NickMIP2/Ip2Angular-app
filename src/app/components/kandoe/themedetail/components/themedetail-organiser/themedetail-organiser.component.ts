import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../../../model/theme';
import {ThemeService} from '../../../../../services/theme.service';
import {ActivatedRoute} from '@angular/router';
import {UseridStorage} from '../../../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-themedetail-organiser',
  templateUrl: './themedetail-organiser.component.html',
  styleUrls: ['./themedetail-organiser.component.css']
})
export class ThemedetailOrganiserComponent implements OnInit {

  public themeId;
  public theme: Theme;
  public users = [];
  public userId;
  public newOrganiser = '';
  public uniqueMail = true;
  public alreadyExistsCheck = false;

  constructor(private themeService: ThemeService, private route: ActivatedRoute, private userIdStorage: UseridStorage) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    window.document.title = 'Organisators';
    this.themeId = this.route.parent.snapshot.params['themeId'];

    this.themeService.getUsersOfTheme(this.themeId, this.userId).subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error loading users!');
        console.log(error);
        alert('Error loading users');
      });
  }

  registerNewOrganiser() {
    this.themeService.addUserToTheme(this.newOrganiser, this.themeId, this.userId).subscribe(
      data => {
        this.users = data;
        console.log(data);
        this.newOrganiser = '';
      },
      error => {
        console.error('Error adding user!');
        console.log(error);
        alert('Error adding user');
      });
  }

  emailAlreadyExists() {
    for (const user of this.users) {
      if (user.email === this.newOrganiser) {
        this.uniqueMail = false;
        this.alreadyExistsCheck = true;
      }
    }
    if (!this.alreadyExistsCheck) {
      this.uniqueMail = true;
    }
    this.alreadyExistsCheck = false;
  }

  removeOrganiser(user) {
    if (this.users.length > 1) {
      this.themeService.removeUserFromTheme(user.id, this.themeId, this.userId).subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.error('Error removing user!');
          console.log(error);
          alert('Error removing user');
        });
    }
  }

}
