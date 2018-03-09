import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
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

  updateCategory(category: Category, themeId: number, userId: number): Observable<any> {
    const body = JSON.stringify(category);
    console.log('theme id: ' + themeId);
    console.log('json body:' + body);
    return this.http.put('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/categories/' + category.id, body , httpOptions);
  }

  deleteCategory(id: number, userId: number, themeId: number): Observable<any> {
    return this.http.delete('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/categories/' + id, httpOptions);
  }

  deleteCategoryInOverview(id: number, userId: number, themeId: number): Observable<any> {
    return this.http.delete('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/categories/' + id + '/overview', httpOptions);
  }

  getCategoriesByTheme(themeId: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/categories');
  }

  getCategory(categoryId: number, themeId: number, userId: number): Observable<any> {
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId + '/themes/' + themeId + '/categories/' + categoryId);
  }
}
