import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {User} from '../model/user';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<any> {
    const body = JSON.stringify(user);
    return this.http.post('https://kandoe-backend.herokuapp.com/register', body, httpOptions);
  }

  login(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    const body = JSON.stringify(credentials);
    return this.http.post('https://kandoe-backend.herokuapp.com/token/generate-token', body, httpOptions);
  }

}
