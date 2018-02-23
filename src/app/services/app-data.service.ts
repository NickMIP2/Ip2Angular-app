import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class AppDataService {
  constructor(private http: AuthHttp) {
  }

  getUsers() {
    return this.http.get('/springjwt/users').map(res => res.json());
  }
  getThemes() { // alle thema's, niet van 1 user
    return this.http.get('https://kandoe-backend.herokuapp.com/themes').map(res => res.json());
  }

  getThemesOfUser(id){
    return this.http.get('https://kandoe-backend.herokuapp.com/users/' + id + '/themes').map(res => res.json());
  }

  getThemeById(id){
    return this.http.get('https://kandoe-backend.herokuapp.com/themes/' + id).map(res => res.json());
}


}
