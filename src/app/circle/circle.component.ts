import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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

  constructor(private sessionService: SessionService, private userIdStorage: UseridStorage, private ref: ChangeDetectorRef) {
  }

  @Input() public isOrganiser = true;
  public isMyTurn = true;

  public selectedCard = new SessionCard(null, '', '', '', 0, 0, 0, 0);

  @Input() sessionCards;
  circleRingSize;
  // helft van div width/height
  cardThickness = 15;
  // helft van div width/height
  circleRadius = 300;
  amountOfRings = 8;
  public rings = [];
  public angles = [];
  public index;
  userId;
  public username;
  private stompClient;
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';
  @Input() private sessionId;
  @Input() currentUserTurnId;


  ngOnInit() {
    console.log('length' + this.sessionCards.length);
    this.userId = this.userIdStorage.getUserId();
    this.username = this.userIdStorage.getUsername();

    const step = 100 / (this.amountOfRings);
    let z = 10;
    for (let i = 0; i < this.amountOfRings; i++) {
      this.rings.push(new Ring(step + (i * step), step + (i * step), z));
      z = z - 1;
    }
    this.initializeWebSocketConnection(this.sessionId, this.userId, this);

  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let card of this.sessionCards) {
      card.distance = this.amountOfRings;
    }

    if(this.currentUserTurnId === this.userId){
      this.isMyTurn = false;
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

      const ringRadius = (this.circleRadius - ((this.circleRadius) - (this.sessionCards[index].distance + 1 - this.sessionCards[index].priority) * this.circleRingSize)) - this.cardThickness;

      console.log(ringRadius);

      const circleStart = this.circleRadius - this.cardThickness;

      this.sessionCards[index].x = circleStart + (ringRadius * Math.cos(angleRadians));
      this.sessionCards[index].y = circleStart + (ringRadius * Math.sin(angleRadians));
    }
  }

  confirmMoveCard() {

    /*
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
      */

      // spreek service aan
      this.sessionService.saveSelectedCard(this.selectedCard, this.sessionId, this.userIdStorage.getUserId()).subscribe(data => {
        this.stompClient.send('/app/send/sessionCard/' + this.sessionId, {}, this.selectedCard.id + ';' + data);
      });

    if (this.selectedCard.priority === 8) {
      alert(this.selectedCard.name + ' WINT');
    }

    this.isMyTurn = true;
  }

  selectCard(sessionCard, i) {

    this.selectedCard = sessionCard;
    this.index = i;
  }

  public endSession() {

  }

  initializeWebSocketConnection(id: number, userId: number, comp: CircleComponent) {
    console.log('completed + sessionId:' + this.sessionId);
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/cards/' + id, (cardid) => {
        if (cardid.body) {
          let selectedCardId = Number(cardid.body.toString().split(";")[0]);
          let currentUserId = Number(cardid.body.toString().split(';')[1]);
          comp.increaseCardPriority(selectedCardId);
          comp.setCards();
          if(currentUserId === userId){
            comp.isMyTurn = false;
          }
        }
      });
    });
  }

  public increaseCardPriority(id: number){

    for(let card of this.sessionCards){
      if (card.id === id){
        card.priority += 1;
      }
    }

  }

}