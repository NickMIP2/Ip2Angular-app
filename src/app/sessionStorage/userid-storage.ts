import {Injectable} from '@angular/core';

const USER_ID = 'UserId';

@Injectable()
export class UseridStorage {

  public saveUserId(userId: number) {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, userId.toString());
  }

  public getUserId(): number {
    return Number(sessionStorage.getItem(USER_ID));
  }
}
