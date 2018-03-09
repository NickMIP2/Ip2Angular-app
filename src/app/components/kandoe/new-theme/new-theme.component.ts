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

  public theme = new Theme(0, '', '', ['tag1', 'tagd']);
  private userId;

  submitted = false;

  constructor(private themeService: ThemeService, private router: Router, private userIdStorage: UseridStorage) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    window.document.title = 'Nieuw thema';
  }

  createTheme() {
    this.themeService.createTheme(this.theme, this.userId).subscribe(
      data => {
        this.router.navigate(['themes/' + data.id + '/overview']); // id van teruggekregen thema
      },
      error => {
        console.error('Error creating theme!');
        console.log(error);
        alert('Error creating theme');
      });
  }

}
