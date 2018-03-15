import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Card} from '../model/card';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class CardService {

  constructor(private http: HttpClient) {
  }

  createCard(categoryId: number,card: Card, themeId: number, userId: number): Observable<any> {
    const body = JSON.stringify(card);
    console.log('theme id: ' + themeId);
    console.log('json body:' + body);
    return this.http.post('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/categories/' + categoryId + '/cards', body, httpOptions);
  }

  updateCard(categoryId: number, card: Card, themeId: number, userId: number): Observable<any> {
    const body = JSON.stringify(card);
    console.log('theme id: ' + themeId);
    console.log('json body:' + body);
    return this.http.put('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/categories/' + categoryId +  '/cards/' + card.id, body, httpOptions);
  }

  deleteCard(categoryId: number, id: number, userId: number, themeId: number): Observable<any> {
    return this.http.delete('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/categories/' + categoryId + '/cards/' + id, httpOptions);
  }

  getCardsByCategory(categoryId: number, themeId: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/categories/' + categoryId + '/cards');
  }

  getCard(categoryId: number, cardId: number, themeId: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/categories/' + categoryId + '/cards/' + cardId);
  }
}
