import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SessionCard} from '../model/sessioncard';
import {Ring} from '../model/ring';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {SessionService} from '../services/session.service';
import {UseridStorage} from '../sessionStorage/userid-storage';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit, OnChanges {

  constructor(private sessionService: SessionService, private userIdStorage: UseridStorage) {
  }

  @Input() public isOrganiser = true;
  @Input() public isMyTurn = true;

  public selectedCard = new SessionCard(null, '', 8, 0, 0);
  public sessionCard1 = new SessionCard(1, 'card1', 8, 0, 0);
  public sessionCard2 = new SessionCard(2, 'card2', 8, 0, 0);

  public sessionCard3 = new SessionCard(3, 'card3', 8, 0, 0);
  public sessionCard4 = new SessionCard(4, 'card4', 8, 0, 0);

  public sessionCard5 = new SessionCard(5, 'card5', 8, 0, 0);
  public sessionCard6 = new SessionCard(6, 'card6', 8, 0, 0);

  @Input() sessionCards = [this.sessionCard1, this.sessionCard2, this.sessionCard3, this.sessionCard4, this.sessionCard5, this.sessionCard6];
  circleRingSize;

  // helft van div width/height
  cardThickness = 17.5;

  // helft van div width/height
  circleRadius = 350;

  amountOfRings = 8;
  public rings = [];
  public angles = [];
  public index;

  private stompClient;
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';
  @Input() private sessionId;

  ngOnInit() {

    const step = 100 / (this.amountOfRings);
    let z = 10;
    for (let i = 0; i < this.amountOfRings; i++) {
      this.rings.push(new Ring(step + (i * step), step + (i * step), z));
      z = z - 1;
    }
    this.setCards();
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  public setCards() {
    this.circleRingSize = this.circleRadius / (this.amountOfRings);
    let index = 0;
    for (index; index < this.sessionCards.length; index++) {

      const angleDegrees = ((360 / this.sessionCards.length) * index);

      const angleRadians = angleDegrees * (Math.PI / 180);
      this.angles.push(angleRadians);

      console.log(this.circleRingSize);

      const ringRadius = (this.circleRadius - ((this.circleRadius) - ((this.sessionCards[index].distanceToCenter + 1) * this.circleRingSize))) - this.cardThickness;

      console.log(ringRadius);

      const circleStart = this.circleRadius - this.cardThickness;

      this.sessionCards[index].x = circleStart + (ringRadius * Math.cos(angleRadians));
      this.sessionCards[index].y = circleStart + (ringRadius * Math.sin(angleRadians));
    }
  }

  confirmMoveCard() {
    if (this.isMyTurn) {

      // this.isMyTurn = false;
      const topX = this.selectedCard.x;
      const topY = this.selectedCard.y;

      let sessionCardRadius;
      let angle;

      let midpointX = topX - (this.circleRadius);
      let midpointY = topY - (this.circleRadius);
      console.log('cardx: ' + topX + 'cardy: ' + topY);
      console.log('x: ' + midpointX + 'y: ' + midpointY);
      sessionCardRadius = Math.sqrt(Math.pow(midpointX, 2) + Math.pow(midpointY, 2));

      console.log(sessionCardRadius + ' straal');
      angle = this.angles[this.index];
      console.log('angle ' + angle);

      sessionCardRadius = sessionCardRadius - this.circleRingSize;

      midpointX = sessionCardRadius * Math.cos(angle);
      midpointY = sessionCardRadius * Math.sin(angle);

      this.selectedCard.x = midpointX + (this.circleRadius);
      this.selectedCard.y = midpointY + (this.circleRadius);

      this.selectedCard.distanceToCenter = this.selectedCard.distanceToCenter - 1;

      // spreek service aan
      this.sessionService.saveSessionCards(this.sessionCards, this.sessionId, this.userIdStorage.getUserId()).subscribe();
      this.stompClient.send('/app/send/message/' + this.sessionId, {}, this.selectedCard); // ipv 2 -> sessionId

    } else {
      return;
    }
    if (this.selectedCard.distanceToCenter === 0) {
      alert(this.selectedCard.name + ' WINT');
    }
  }

  selectCard(sessionCard, i) {

    this.selectedCard = sessionCard;
    this.index = i;
  }

  public endSession() {

  }
}
