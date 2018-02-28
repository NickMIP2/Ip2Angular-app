import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any>{
    const credentials = {username: username, password: password};
    const testregi = {username: username, password: password, firstname: 'nickjwt', lastname: 'marcoenjwt', email: 'testmail@nick.com'};
    this.http.post("https://kandoe-backend.herokuapp.com/register", testregi, httpOptions); // test
    return this.http.post('https://kandoe-backend.herokuapp.com/token/generate-token', credentials, httpOptions);
  }

}
