import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-winning-card',
  templateUrl: './winning-card.component.html',
  styleUrls: ['./winning-card.component.css']
})
export class WinningCardComponent implements OnInit {

  @Input() winningCards;
  @Input() earlyStop;


  constructor(private router: Router,
              private translate: TranslateService) { }

  ngOnInit() {
  }

  toDashboard() {
    this.router.navigate(['kandoe/dashboard']);
  }
}
