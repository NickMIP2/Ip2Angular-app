import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }


  register(){
    const testregi = {username: 'Nicktestdsdsq', password: 'passwdo', firstname: 'nickjwt', lastname: 'marcoenjwt', email: 'testmail@nick.com'};
    this.http.post("https://kandoe-backend.herokuapp.com/register", testregi);
  }

  login(username: string, password: string): Observable<any>{
    const credentials = {username: username, password: password};
    return this.http.post('https://kandoe-backend.herokuapp.com/token/generate-token', credentials);

  }

}
