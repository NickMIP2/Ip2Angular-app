import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Theme} from '../model/theme';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {of} from 'rxjs/observable/of';
import {Category} from '../model/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  createCategory(category: Category, themeId: number, userId: number): Observable<any> {
    const body = JSON.stringify(category);
    console.log('theme id: ' + themeId);
    console.log('json body:' + body);
    return this.http.post('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/categories', body , httpOptions);
  }

  getCategoriesByTheme(themeId: number): Category[] {
    const category1: Category = {id: 1, name: 'mockCategory', themeId: 7};
    const category2: Category = {id: 2, name: 'mockCategory2', themeId: 7};
    return [category1, category2];
  }

}
