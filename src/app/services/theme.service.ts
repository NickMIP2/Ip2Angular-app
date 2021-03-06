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
    return this.http.post('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes', body, httpOptions);
  }

  getTheme(id: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + id);
  }

  updateTheme(theme: Theme, userId: number): Observable<any> {
    const body = JSON.stringify(theme);
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

    return this.http.put('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/users', email, httpOptions);
  }

  removeUserFromTheme(organiserId: number, themeId: number, userId: number): Observable<any> {
    return this.http.delete('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/users/' + organiserId + '/remove', httpOptions);
  }
}
