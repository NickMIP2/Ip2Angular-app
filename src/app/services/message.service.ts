import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Message} from '../model/message';
import {Observable} from 'rxjs/Observable';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(message: Message): Observable<any>{
    const body = JSON.stringify(message);
    return this.http.post('https://kandoe-backend.herokuapp.com/messages/' + message.sessionId , body , httpOptions);
  }

}
