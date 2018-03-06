import {SessionType} from './enum/sessiontype';
import {SessionState} from './enum/sessionstate';

export class Session {
  constructor(public id: number, public name: string,
              public themeId: number, public maxCards: number,
              public totalRounds: number, public categoryId: number,
              public timeForMove: number, public participantIds: number[],
              public type: SessionType, public sessionCardIds: number[],
              public state: SessionState) {

  }

}
