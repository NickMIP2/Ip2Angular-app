import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Theme} from '../model/theme';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class ThemeService {

  constructor(private http: HttpClient) {

  }

  createTheme(theme: Theme, userId: number): Observable<any> {
    const body = JSON.stringify(theme);
    console.log('user id: ' + userId);
    console.log('json body:' + body);
    return this.http.post('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes', body, httpOptions);
  }

  getTheme(id: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + id);
  }

  updateTheme(theme: Theme, userId: number): Observable<any> {
    const body = JSON.stringify(theme);
    console.log('user id: ' + userId);
    console.log('json body:' + body);
    return this.http.put('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + theme.id, body, httpOptions);
  }

  deleteTheme(id: number, userId: number): Observable<any> {
    return this.http.delete('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + id, httpOptions);
  }

  deleteThemeInOverview(id: number, userId: number): Observable<any> {
    return this.http.delete('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + id + '/overview', httpOptions);
  }

  getThemesOfUser(userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes');
  }

  getUsersOfTheme(themeId: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/users');
  }

  addUserToTheme(email: string, themeId: number, userId: number): Observable<any> {
    const body = JSON.stringify(email);
    console.log('user id: ' + userId);
    console.log('json body:' + body);
    return this.http.put('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/users', body, httpOptions);
  }

  removeUserFromTheme(email: string, themeId: number, userId: number): Observable<any> {
    const body = JSON.stringify(email);
    return this.http.put('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/users/remove', body, httpOptions);
  }
}
