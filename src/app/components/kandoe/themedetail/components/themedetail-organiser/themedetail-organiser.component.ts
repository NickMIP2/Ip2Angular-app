import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../../../model/theme';
import {ThemeService} from '../../../../../services/theme.service';
import {ActivatedRoute} from '@angular/router';
import {UseridStorage} from '../../../../../sessionStorage/userid-storage';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-themedetail-organiser',
  templateUrl: './themedetail-organiser.component.html',
  styleUrls: ['./themedetail-organiser.component.css']
})
export class ThemedetailOrganiserComponent implements OnInit {

  title = '';
  error_message = '';
  public themeId;
  public theme: Theme;
  public users = [];
  public userId;
  public newOrganiser = '';
  public uniqueMail = true;
  public alreadyExistsCheck = false;
  public lastOrganiser = false;

  constructor(private themeService: ThemeService,
              private route: ActivatedRoute,
              private userIdStorage: UseridStorage,
              private snackBar: MatSnackBar,
              private translate: TranslateService) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    this.translate.get('Kandoe.Themedetail.organiser.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;    this.themeId = this.route.parent.snapshot.params['themeId'];

    this.themeService.getUsersOfTheme(this.themeId, this.userId).subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error loading users!');
        console.log(error);
        this.snackBar.open('Er ging iets mis bij het ophalen van deze gegevens', 'x', {duration: 2000});

      }, () => {
        this.checkIfLastOrganiser();
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
        this.snackBar.open('Er ging iets mis bij het opslaan van deze gegevens', 'x', {duration: 2000});
      }, () => {
        this.checkIfLastOrganiser();

        this.snackBar.open('Wijzigingen opgeslagen', 'x', {duration: 2000});

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
    if (!this.lastOrganiser) {
      this.themeService.removeUserFromTheme(user.id, this.themeId, this.userId).subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.error('Error removing user!');
          console.log(error);
          this.snackBar.open('Fout bij verwijderen organisator', 'x', {duration: 2000});
        }, () => {
          this.checkIfLastOrganiser();
          this.snackBar.open('Verwijderen succesvol!', 'x', {duration: 2000});

        });
    }
  }

  checkIfLastOrganiser() {
    this.lastOrganiser = this.users.length <= 1;
  }
}
