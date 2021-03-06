import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../model/theme';
import {ThemeService} from '../../../services/theme.service';
import {Router} from '@angular/router';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css'],
  providers: [ThemeService, UseridStorage]
})
export class NewThemeComponent implements OnInit {
  public theme = new Theme(null, '', '', [], '');
  private userId;
  public tagValue = '';
  title = '';
  error_message = '';

  submitted = false;

  constructor(private themeService: ThemeService,
              private router: Router,
              private userIdStorage: UseridStorage,
              private translate: TranslateService,
              private snackBar: MatSnackBar) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    this.translate.get('Kandoe.New-theme.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;
  }

  createTheme() {
    this.themeService.createTheme(this.theme, this.userId).subscribe(
      data => {
        this.router.navigate(['kandoe/themes/' + data.id + '/overview']); // id van teruggekregen thema
      },
      error => {
        this.translate.get('Kandoe.New-theme.error_message', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        this.snackBar.open(this.error_message, 'x', {duration: 2000});

      });
  }

  changeListener($event) {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.theme.image = myReader.result.toString();
    };
    myReader.readAsDataURL(file);
  }

  addTag() {
    if (!(this.tagValue === '')) {
      this.theme.tags.push(this.tagValue);
      this.tagValue = '';
    }
  }

  deleteTag(i) {
    this.theme.tags.splice(i, 1);
  }

  navigateAbort() {
    this.router.navigate(['kandoe/themes/']);
  }
}
