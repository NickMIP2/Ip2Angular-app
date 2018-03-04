import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Theme} from '../model/theme';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {of} from 'rxjs/observable/of';
import {Card} from '../model/card';
import {Category} from '../model/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class CardService {

  private cardsurl = '/api/cards';

  constructor(private httpClient: HttpClient) {
  }

  getCard(id: number): Card {
    const category1: Category = {id: 1, name: 'mockCategory', themeId: 7};
    const category2: Category = {id: 2, name: 'mockCategory2', themeId: 7};
    return {
      id: 1,
      themeId: 1,
      title: 'Kaart 1',
      description: 'De eerste kaart',
      image: '',
      categories: [category1, category2, category2, category2, category2]
    };
  }

}
