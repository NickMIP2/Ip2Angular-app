import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Theme} from '../model/theme';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {of} from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable()
export class ThemeService {

  private themesurl = 'api/themes';

  constructor(private http: HttpClient) {

  }

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.themesurl);
    // return this.http.get('http://.../userid/themes').map((res) => res.json());
  }

  getTheme(id: number): Observable<Theme> {
    const url = `${this.themesurl}/${id}`;
    return this.http.get<Theme>(url);
  }

  updateTheme(theme: Theme): Observable<any> {
    const url = `${this.themesurl}/${theme.id}`;
    return this.http.put<Theme>(url, theme, httpOptions)
      .pipe(catchError(this.handleError('updateTheme')));
  }

  createTheme(theme: Theme): Observable<any> {
    return this.http.post<Theme>(this.themesurl, theme)
      .pipe(
        catchError(this.handleError('createTheme'))
      );
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
