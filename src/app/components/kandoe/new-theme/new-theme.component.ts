import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../model/theme';
import {ThemeService} from '../../../services/theme.service';
import { Router} from '@angular/router';
import {UseridStorage} from '../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css'],
  providers: [ThemeService, UseridStorage]
})
export class NewThemeComponent implements OnInit {

  public theme = new Theme(0, '', '', ['tag1', 'tag2465'], '');
  private userId;

  submitted = false;

  constructor(private themeService: ThemeService, private router: Router, private userIdStorage: UseridStorage) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    window.document.title = 'Nieuw thema';
  }

  createTheme() {
    console.log('themeName: ' + this.theme.name + '; image: ' + this.theme.image.substring(0, 30) + '...');
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

  navigateAbort() {
    this.router.navigate(['kandoe/themes/']);
  }
}
