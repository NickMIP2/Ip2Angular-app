import {AfterViewChecked, Component} from '@angular/core';
import {Router} from '@angular/router';
import {ChangeDetectorRef} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewChecked {
  title = 'Kandoe';

  constructor(private router: Router, private cdRef: ChangeDetectorRef, translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('nl');
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}

