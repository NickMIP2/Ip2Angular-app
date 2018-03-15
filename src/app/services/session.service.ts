import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Session} from '../model/session';
import {SessionCard} from '../model/sessioncard';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class SessionService {

  constructor(private http: HttpClient) {

  }

  createSession(session: Session, userId: number): Observable<any> {
    const body = JSON.stringify(session);
    console.log('user id: ' + userId);
    console.log('json body:' + body);
    return this.http.post('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions', body, httpOptions);
  }

  getSession(id: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + id);
  }

  updateSession(session: Session, userId: number): Observable<any> {
    const body = JSON.stringify(session);
    console.log('user id: ' + userId);
    console.log('json body:' + body);
    return this.http.put('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + session.id, body, httpOptions);
  }

  deleteSession(id: number, userId: number): Observable<any> {
    return this.http.delete('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + id, httpOptions);
  }

  getSessionsOfUser(userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions');
  }

  saveSessionCards(sessionCards: SessionCard[], sessionId: number , userId: number): Observable<any> {
    const body = JSON.stringify(sessionCards);
    return this.http.post('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + sessionId + '/saveCards', body, httpOptions);
  }
}

