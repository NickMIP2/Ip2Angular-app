import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-winning-card',
  templateUrl: './winning-card.component.html',
  styleUrls: ['./winning-card.component.css']
})
export class WinningCardComponent implements OnInit {

  @Input() winningCardName;

  constructor() { }

  ngOnInit() {
  }

}
