import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Headers, RequestOptions, Response} from '@angular/http';

@Injectable()
export class ThemeserviceService {

  constructor(private http: Http) {
  }

  getThemes() {
    return this.http.get('data/mock_data.json').map((res) => res.json());
    // return this.http.get('http://.../userid/themes').map((res) => res.json());
  }

  getTheme(id) {
    return this.http.get('http://.../userid/themes/themeid').map((res) => res.json());
  }

  updateTheme(theme) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(theme);
    return this.http.put('http://.../userid/themes' + theme.id, body, options).map((res: Response) => res.json());
  }

  createTheme(theme) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(theme);
    return this.http.post('http://.../userid/themes', body, options).map((res) => res.json());
  }

  deleteTheme(theme) {
    return this.http.delete('http://.../userid/themes/' + theme.id).map((res) => res.json());
  }
}
