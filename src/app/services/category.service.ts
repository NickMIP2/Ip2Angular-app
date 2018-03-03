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
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class CategoryService {

  private categoriesurl = 'api/categories';

  constructor(private http: HttpClient) {
  }

  getCategoriesByTheme(themeId: number): Category[] {
    const category1: Category = {id: 1, name: 'mockCategory'};
    const category2: Category = {id: 2, name: 'mockCategory2'};
    return [category1, category2];
  }

}
