import { Component, OnInit } from '@angular/core';
import {Card} from '../../../../../model/card';
import {Category} from '../../../../../model/category';
import {Theme} from '../../../../../model/theme';
import {ThemeService} from '../../../../../services/theme.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-themedetail-cards',
  templateUrl: './themedetail-cards.component.html',
  styleUrls: ['./themedetail-cards.component.css']
})
export class ThemedetailCardsComponent implements OnInit {
  public category1: Category = {id: 1, name: 'mockCategory', themeId: 7};
  public category2: Category = {id: 2, name: 'mockCategory2', themeId: 7};

  public card1: Card = {
    id: 1,
    themeId: 1,
    title: 'Kaart 1',
    description: 'De eerste kaart',
    image: '',
    categories: [this.category1, this.category2, this.category2, this.category2, this.category2]
  };
  public card2: Card = {
    id: 2,
    themeId: 1,
    title: 'Kaart 2',
    description: 'De tweede kaart',
    image: '',
    categories: [this.category1, this.category2, this.category2, this.category2, this.category2, this.category2, this.category2, this.category2, this.category2]
  };
  public card3: Card = {
    id: 3,
    themeId: 1,
    title: 'Kaart 2',
    description: 'De tweede kaart',
    image: '',
    categories: [this.category1, this.category2]
  };
  public card4: Card = {
    id: 4,
    themeId: 1,
    title: 'Kaart 2',
    description: 'De tweede kaart',
    image: '',
    categories: [this.category1, this.category2]
  };
  public card5: Card = {
    id: 5,
    themeId: 1,
    title: 'Kaart 2',
    description: 'De tweede kaart',
    image: '',
    categories: [this.category1, this.category2]
  };
  public card6: Card = {
    id: 6,
    themeId: 1,
    title: 'Kaart 2',
    description: 'De tweede kaart',
    image: '',
    categories: [this.category1, this.category2]
  };
  public card7: Card = {
    id: 7,
    themeId: 1,
    title: 'Kaart 2',
    description: 'De tweede kaart',
    image: '',
    categories: [this.category1, this.category2]
  };
  public card8: Card = {
    id: 8,
    themeId: 1,
    title: 'Kaart 2',
    description: 'De tweede kaart',
    image: '',
    categories: [this.category1, this.category2]
  };
  public cards = [this.card1, this.card2, this.card3, this.card4, this.card5, this.card6, this.card7, this.card8];
  public themeId;
  public theme: Theme = {
    id: 0,
    name: 'Oeps',
    description: 'Er ging iets fout bij het ophalen van dit thema, probeer opnieuw',
    tags: ['']
  };

  constructor(private themeService: ThemeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    window.document.title = 'Kaarten';
  }

}
