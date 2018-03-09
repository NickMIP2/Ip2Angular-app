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

  sendMessage(message: Message, id: number): Observable<any> {
    const body = JSON.stringify(message);
<<<<<<< HEAD
    return this.http.post('https://kandoe-backend.herokuapp.com/sessions/' + id + "/messages" , body , httpOptions);
=======
    console.log(body);
    return this.http.post('https://kandoe-backend.herokuapp.com/sessions/' + id + '/messages', body, httpOptions);
>>>>>>> master
  }

}
