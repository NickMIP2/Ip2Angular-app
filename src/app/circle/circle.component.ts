import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  public isMyTurn = true;

  public selectedCard = new SessionCard(null, '', '', '', 0, 0, 0, 0);
  /*;
  public sessionCard1 = new SessionCard(1, 'card1', 8, 0, 0);
  public sessionCard2 = new SessionCard(2, 'card2', 8, 0, 0);

  public sessionCard3 = new SessionCard(3, 'card3', 8, 0, 0);
  public sessionCard4 = new SessionCard(4, 'card4', 8, 0, 0);

  public sessionCard5 = new SessionCard(5, 'card5', 8, 0, 0);
  public sessionCard6 = new SessionCard(6, 'card6', 8, 0, 0);*/

  @Input() sessionCards;
  /*[this.sessionCard1, this.sessionCard2, this.sessionCard3, this.sessionCard4, this.sessionCard5, this.sessionCard6]*/

  circleRingSize;

  // helft van div width/height
  cardThickness = 17.5;

  // helft van div width/height
  circleRadius = 350;

  amountOfRings = 8;
  public rings = [];
  public angles = [];
  public index;
  currentCardId;
  currentUserId;
  private stompClient;
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';
  @Input() private sessionId;


  ngOnInit() {
    console.log('length' + this.sessionCards.length);
    const step = 100 / (this.amountOfRings);
    let z = 10;
    for (let i = 0; i < this.amountOfRings; i++) {
      this.rings.push(new Ring(step + (i * step), step + (i * step), z));
      z = z - 1;
    }
    this.initializeWebSocketConnection(this.sessionId);

  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let card of this.sessionCards) {
      card.distance = this.amountOfRings - card.priority;
    }
    this.setCards();
  }

  public setCards() {
    this.circleRingSize = this.circleRadius / (this.amountOfRings);
    let index = 0;
    console.log('setcard' + this.sessionCards.length);
    for (index; index < this.sessionCards.length; index++) {

      const angleDegrees = ((360 / this.sessionCards.length) * index);

      const angleRadians = angleDegrees * (Math.PI / 180);
      this.angles.push(angleRadians);

      console.log(this.circleRingSize);

      const ringRadius = (this.circleRadius - ((this.circleRadius) - ((this.sessionCards[index].distance + 1) * this.circleRingSize))) - this.cardThickness;

      console.log(ringRadius);

      const circleStart = this.circleRadius - this.cardThickness;

      this.sessionCards[index].x = circleStart + (ringRadius * Math.cos(angleRadians));
      this.sessionCards[index].y = circleStart + (ringRadius * Math.sin(angleRadians));
    }
  }

  confirmMoveCard() {

    if (this.isMyTurn) {

      this.isMyTurn = false;
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

      this.selectedCard.distance = this.selectedCard.distance - 1;

      // spreek service aan
      this.sessionService.saveSelectedCard(this.selectedCard, this.sessionId, this.userIdStorage.getUserId()).subscribe(data => {
        this.stompClient.send('/app/send/sessionCard/' + this.sessionId, {}, this.selectedCard.id + ';' + data);
      });

    } else {
      return;
    }
    if (this.selectedCard.priority === 8) {
      alert(this.selectedCard.name + ' WINT');
    }
  }

  selectCard(sessionCard, i) {

    this.selectedCard = sessionCard;
    this.index = i;
  }

  public endSession() {

  }

  initializeWebSocketConnection(id: number) {
    console.log('completed + sessionId:' + this.sessionId);
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/cards/' + id, (cardid) => { // ipv 2 -> sessionId
        if (cardid.body) {
          console.log(cardid);
          this.currentCardId = cardid.split(';');
          this.currentUserId = cardid.splice(';')[1];
          if (this.currentUserId === this.userIdStorage.getUserId()) {
            this.isMyTurn = true;
          }
          console.log('currentCard' + this.currentCardId);
          console.log('currentUser' + this.currentUserId);
        }
      });
    });
  }
}
