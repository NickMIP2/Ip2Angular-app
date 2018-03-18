export class Session {
  constructor(public id: number,
              public sessionCardIds: number[],
              public priorities: number[],
              public sessionId: number,
              public date: Date
  ) {
  }
}
