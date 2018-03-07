import {Theme} from './theme';

export class Session {
  constructor(public id: number,
              public name: string,
              public chance: boolean,
              public themeId: number,
              public categoryId: number,
              public maxCards: number,
              public totalRounds: number,
              public timeForMove: number,
              public participants: string[]) {}
}
