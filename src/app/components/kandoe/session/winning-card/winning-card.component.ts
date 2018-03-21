import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-winning-card',
  templateUrl: './winning-card.component.html',
  styleUrls: ['./winning-card.component.css']
})
export class WinningCardComponent implements OnInit {

  @Input() winningCards;
  @Input() earlyStop;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  toDashboard() {
    this.router.navigate(['kandoe/dashboard']);
  }
}
