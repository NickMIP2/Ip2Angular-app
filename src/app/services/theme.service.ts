import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Theme} from '../model/theme';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

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

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.themesurl);
    // return this.http.get('http://.../userid/themes').map((res) => res.json());
  }

  updateTheme(theme: Theme): Observable<any> {
    const url = `${this.themesurl}/${theme.id}`;
    return this.http.put<Theme>(url, theme, httpOptions)
      .pipe(catchError(this.handleError('updateTheme')));
  }

  deleteTheme(theme: Theme): Observable<{}> {
    return this.http.delete('http://.../userid/themes/' + theme.id).pipe(catchError(this.handleError('deleteTheme')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
