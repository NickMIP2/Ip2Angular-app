import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from './auth.constant';
import {User} from '../model/user';

@Injectable()
export class AuthenticationService {
  static AUTH_TOKEN = '/oauth/token';

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

  register(user: User, password: string, username: string) {
    const body = `username=${encodeURIComponent(username)}&firstname=${encodeURIComponent(user.firstName)}&lastname=${encodeURIComponent(user.lastName)}&email=${encodeURIComponent(user.email)}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + '???????');

    return this.http.post(AuthenticationService.AUTH_TOKEN, body, {headers})
      .map(res => res)
      .map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      });
  }
}
