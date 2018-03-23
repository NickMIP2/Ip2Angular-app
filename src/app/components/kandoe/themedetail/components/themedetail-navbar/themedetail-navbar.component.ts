import {TranslateService} from '@ngx-translate/core';
import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ThemeService} from '../../../../../services/theme.service';
import {MatSnackBar} from '@angular/material';
import {UseridStorage} from '../../../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-themedetail-navbar',
  templateUrl: './themedetail-navbar.component.html',
  styleUrls: ['./themedetail-navbar.component.css']
})
export class ThemedetailNavbarComponent implements OnInit, AfterViewInit {
  public theme;
  public themeId;

  constructor(private route: ActivatedRoute, private themeService: ThemeService, private snackBar: MatSnackBar,
              private useridStorage: UseridStorage,
              private translate: TranslateService) {

    this.themeId = this.route.snapshot.params['themeId'];
  }

  ngAfterViewInit() {}

  ngOnInit() {
    this.themeService.getTheme(this.themeId, this.useridStorage.getUserId()).subscribe(data => {
        this.theme = data;
      });
  }

}
