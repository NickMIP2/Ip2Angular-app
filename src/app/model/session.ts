import {Theme} from './theme';

export class Session {
  constructor(public id: number,
              public name: string,
              public chance: boolean,
              public theme: Theme,
              public maxCards: number,
              public noOfRounds: number,
              public timePerMoveHour: number,
              public participants: string,
  ) {}
}
