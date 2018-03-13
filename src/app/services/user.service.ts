import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(userId: number): User {
    const user: User = {'id': 0, 'email': 'email', 'lastname': 'lastname', 'firstname': 'firstname', 'username': 'username', 'password': 'password', 'organiser': 'organiser'};
    return user;
    /*return this.http.get('https://kandoe-backend.herokuapp.com/users/' + userId);*/
  }
}
