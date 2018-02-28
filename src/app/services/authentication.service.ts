import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {pipe} from 'rxjs/util/pipe';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {



  constructor(private http: HttpClient) {
  }

  register(): Observable<any>{
    const testregi = {username: 'Nzesletteirs', password: 'pasiswddfqsdo', firstname: 'laaitsteTest', lastname: 'Reyndersi', email: 'vincenti@nick.com'};
    let body = JSON.stringify(testregi);
    console.log(body);
    return this.http.post("https://kandoe-backend.herokuapp.com/register", body, httpOptions);
  }

  login(username: string, password: string): Observable<any>{
    const credentials = {username: username, password: password};
    return this.http.post('https://kandoe-backend.herokuapp.com/token/generate-token', credentials);
  }

}
