import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../model/theme';
import {ThemeService} from '../../../services/theme.service';
import {Router} from '@angular/router';
import {UseridStorage} from '../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css'],
  providers: [ThemeService, UseridStorage]
})
export class NewThemeComponent implements OnInit {
  public theme = new Theme(null, '', '',  [], '');
  private userId;
  public tagValue = '';

  submitted = false;

  constructor(private themeService: ThemeService, private router: Router, private userIdStorage: UseridStorage) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    window.document.title = 'Nieuw thema';
  }

  createTheme() {
    console.log('themeName: ' + this.theme.name + '; image: ' + this.theme.image.substring(0, 100) + '...');
    this.themeService.createTheme(this.theme, this.userId).subscribe(
      data => {
        this.router.navigate(['kandoe/themes/' + data.id + '/overview']); // id van teruggekregen thema
      },
      error => {
        console.error('Error creating theme!');
        console.log(error);
        alert('Error creating theme');
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
