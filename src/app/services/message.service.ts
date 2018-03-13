import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Message} from '../model/message';
import {Observable} from 'rxjs/Observable';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class MessageService {

  constructor(private http: HttpClient) {
  }

  sendMessage(message: Message, sessionId: number, userId: number): Observable<any> {
    const body = JSON.stringify(message);
    return this.http.post('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + sessionId + '/messages', body, httpOptions);
  }

  getMessages(sessionId: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/sessions/' + sessionId + '/messages');
  }

}
