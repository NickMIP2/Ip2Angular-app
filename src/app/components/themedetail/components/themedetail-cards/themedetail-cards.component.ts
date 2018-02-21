import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-themedetail-cards',
  templateUrl: './themedetail-cards.component.html',
  styleUrls: ['./themedetail-cards.component.css']
})
export class ThemedetailCardsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.document.title = 'Kaarten';
  }

}
