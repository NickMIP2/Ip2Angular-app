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
    return this.http.get('http://localhost:8080/users/' + userId + '/sessions');
  }

  saveSessionCards(sessionCardIds: number[], sessionId: number , userId: number): Observable<any> {
    const body = JSON.stringify(sessionCardIds);
    return this.http.post('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + sessionId + '/saveCards', body, httpOptions);
  }

  saveSelectedCard(selectedCard: SessionCard, sessionId: number, userId: number): Observable<any> {
    const body = JSON.stringify(selectedCard);
    return this.http.put('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + sessionId + '/sessionCards/' + selectedCard.id, body, httpOptions);
  }

  startSession(sessionId: number, userId: number): Observable<any> {
    const body = JSON.stringify(sessionId);
    console.log("erin")
    return this.http.put('http://localhost:8080/users/' + userId + '/sessions/' + sessionId + '/startPhase1', httpOptions);
      //http://localhost:8080/users/
  }
}

