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
  })
};

@Injectable()
export class CardService {

  constructor(private http: HttpClient) {
  }

  createCard(card: Card, themeId: number, userId: number): Observable<any> {
    const body = JSON.stringify(card);
    console.log('theme id: ' + themeId);
    console.log('json body:' + body.substring(0, 100));
    return this.http.post('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/cards', body, httpOptions);
  }

  updateCard(card: Card, themeId: number, userId: number): Observable<any> {
    const body = JSON.stringify(card);
    console.log('theme id: ' + themeId);
    console.log('json body:' + body);
    return this.http.put('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/cards/' + card.id, body, httpOptions);
  }

  deleteCard(id: number, userId: number, themeId: number): Observable<any> {
    return this.http.delete('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/cards/' + id, httpOptions);
  }

  getCardsByTheme(themeId: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/cards');
  }

  getCardsByCategory(categoryId: number, themeId: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/categories/' + categoryId + '/cards');
  }

  getCard(cardId: number, themeId: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/cards/' + cardId);
  }
}
