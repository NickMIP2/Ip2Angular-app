import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SessionCard} from '../../../../model/sessioncard';
import {Ring} from '../../../../model/ring';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {SessionService} from '../../../../services/session.service';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit, OnChanges {

  constructor(private snackBar: MatSnackBar,
              private sessionService: SessionService,
              private userIdStorage: UseridStorage,
              private ref: ChangeDetectorRef,
              private translate: TranslateService) {
  }

  @Input() public isOrganiser;
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
  public earlyStop = false;
  public username;
  private stompClient;
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';
  public gameIsFinished = false;
  public winningCards = [];
  @Input() private sessionId;
  @Input() currentUserTurnId;


  ngOnInit() {

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
    for (const card of this.sessionCards) {
      card.distance = this.amountOfRings;
    }

    if (this.currentUserTurnId === this.userId) {
      this.isMyTurn = false;
    }
    this.setCards();
  }

  public setCards() {
    this.circleRingSize = this.circleRadius / (this.amountOfRings);
    let index = 0;

    for (index; index < this.sessionCards.length; index++) {

      const angleDegrees = ((360 / this.sessionCards.length) * index);

      const angleRadians = angleDegrees * (Math.PI / 180);
      this.angles.push(angleRadians);


      const ringRadius = (this.circleRadius - ((this.circleRadius) - (this.sessionCards[index].distance + 1 - this.sessionCards[index].priority) * this.circleRingSize)) - this.cardThickness;


      const circleStart = this.circleRadius - this.cardThickness;

      this.sessionCards[index].x = circleStart + (ringRadius * Math.cos(angleRadians));
      this.sessionCards[index].y = circleStart + (ringRadius * Math.sin(angleRadians));
    }
  }

  confirmMoveCard() {
    // spreek service aan
    this.sessionService.saveSelectedCard(this.selectedCard, this.sessionId, this.userIdStorage.getUserId()).subscribe(data => {
      this.stompClient.send('/app/send/sessionCard/' + this.sessionId, {}, this.selectedCard.id + ';' + data);
    });

    this.isMyTurn = true;
  }

  selectCard(sessionCard, i) {

    this.selectedCard = sessionCard;
    this.index = i;
  }

  initializeWebSocketConnection(id: number, userId: number, comp: CircleComponent) {

    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/cards/' + id, (cardid) => {
          if (cardid.body) {
            if (cardid.body.toString() === 'finished') {
              comp.stompEarlyFinish();
            } else {
              const selectedCardId = Number(cardid.body.toString().split(';')[0]);
              if (!(cardid.body.toString().split(';')[1] === '-11')) {
                const currentUserId = Number(cardid.body.toString().split(';')[1]);
                comp.increaseCardPriority(selectedCardId);
                comp.setCards();
                if (currentUserId === userId) {
                  comp.isMyTurn = false;
                }
              } else {
                comp.increaseCardPriority(selectedCardId);
                comp.winningCards = [];
                comp.gameOver();
              }
            }
          }
        }
      );
    });
  }


  public increaseCardPriority(id: number) {
    for (const card of this.sessionCards) {
      if (card.id === id) {
        card.priority += 1;
        if (card.priority === this.amountOfRings) {
          this.gameOver();
        }
      }
    }
  }

  takeSnapshot() {
    this.sessionService.takeSnapShot(this.sessionId, this.userId).subscribe();
    this.snackBar.open('Snapshot genomen', 'x', {duration: 2000});
  }

  gameOver() {
    let highestPriority = 0;
    for (const card of this.sessionCards) {
      if (card.priority > highestPriority) {
        highestPriority = card.priority;
      }
    }
    for (const card of this.sessionCards) {
      if (card.priority === highestPriority) {
        this.winningCards.push(card);
      }
    }
    this.sessionService.endSession(this.sessionId, this.userId).subscribe();
    this.gameIsFinished = true;
  }

  public endSession() {

    this.sessionService.endSession(this.sessionId, this.userId).subscribe();
    this.stompClient.send('/app/send/sessionCard/' + this.sessionId, {}, 'finished');
  }

  public stompEarlyFinish() {
    let highestPriority = 0;
    for (const card of this.sessionCards) {
      if (card.priority > highestPriority) {
        highestPriority = card.priority;
      }
    }
    for (const card of this.sessionCards) {
      if (card.priority === highestPriority) {

        this.winningCards.push(card);
      }
    }

    this.earlyStop = true;
    this.gameIsFinished = true;
  }

}
