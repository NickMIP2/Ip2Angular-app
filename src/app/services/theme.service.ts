import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Theme} from '../model/theme';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ThemeService {

  private themesurl = 'api/themes';

  constructor(private http: HttpClient) {

  }

  createTheme(theme: Theme, userId: number): Observable<any> {
    let body = JSON.stringify(theme);
    console.log("user id: " + userId);
    console.log("json body:" + body);
    return this.http.post("https://kandoe-backend.herokuapp.com/users/" + userId + "/themes", body , httpOptions);
  }

  getTheme(id: number, userId: number): Observable<any> {
    return this.http.get("https://kandoe-backend.herokuapp.com/users/" + userId + "/themes/" + id);
  }

  updateTheme(theme: Theme, userId: number): Observable<any> {
    let body = JSON.stringify(theme);
    console.log("user id: " + userId);
    console.log("json body:" + body);
    return this.http.put("https://kandoe-backend.herokuapp.com/users/" + userId + "/themes/" + theme.id, body , httpOptions);
  }

  deleteTheme(id: number): Observable<{}> {
    return this.http.delete("https://kandoe-backend.herokuapp.com/users/" + id, httpOptions);
  }

  getThemesOfUser(userId: number): Observable<any> {
    return this.http.get("https://kandoe-backend.herokuapp.com/users/" + userId + "/themes");
  }

}
