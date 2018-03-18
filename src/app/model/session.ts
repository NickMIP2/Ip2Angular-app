import {Theme} from './theme';
import {Snapshot} from './snapshot';
import {SessionCard} from './sessioncard';

export class Session {
  constructor(public id: number,
              public name: string,
              public themeId: number,
              public maxCards: number,
              public totalRounds: number,
              public categoryId: number,
              public timeForMove: number,
              public participants: string[],
              public organisers: string[],
              public participantIds: number[],
              public organiserIds: number[],
              public type: number,
              public sessionCardDtos: SessionCard[],
              public state: number,
              public userSubmitted: boolean,
              public startDate: Date,
              public allowCardCreation: boolean,
              public currentUser: number,
              public snapshotDtos: Snapshot[]
  ) {
  }
}
