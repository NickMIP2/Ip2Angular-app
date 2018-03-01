import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from './auth.constant';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

    return this.http.post(AuthenticationService.AUTH_TOKEN, body, {headers})
      .map(res => res)
      .map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      });
  }

  register() {
    const testregi = {
      username: 'Nicktestdsdsq',
      password: 'passwdo',
      firstname: 'nickjwt',
      lastname: 'marcoenjwt',
      email: 'testmail@nick.com'
    };
    this.http.post('https://kandoe-backend.herokuapp.com/register', testregi);
  }

  login(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    return this.http.post('https://kandoe-backend.herokuapp.com/token/generate-token', credentials);

  }
}
