import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SessionCard} from '../model/sessioncard';
import {Ring} from '../model/ring';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit, OnChanges {

  constructor() {
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

  ngOnInit() {

    const step = 100 / (this.amountOfRings);
    let z = 10;
    for (let i = 0; i < this.amountOfRings; i++) {
      this.rings.push(new Ring(step + (i * step), step + (i * step), z));
      z = z - 1;
    }
    this.setCards();
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


  moveCard(sessionCard, i) {
    if (this.isMyTurn) {

      this.isMyTurn = false;
      this.selectedCard = sessionCard;
      const topX = sessionCard.x;
      const topY = sessionCard.y;

      let sessionCardRadius;
      let angle;

      let midpointX = topX - (this.circleRadius);
      let midpointY = topY - (this.circleRadius);
      console.log('cardx: ' + topX + 'cardy: ' + topY);
      console.log('x: ' + midpointX + 'y: ' + midpointY);
      sessionCardRadius = Math.sqrt(Math.pow(midpointX, 2) + Math.pow(midpointY, 2));

      console.log(sessionCardRadius + ' straal');
      angle = this.angles[i];
      console.log('angle ' + angle);

      sessionCardRadius = sessionCardRadius - this.circleRingSize;

      midpointX = sessionCardRadius * Math.cos(angle);
      midpointY = sessionCardRadius * Math.sin(angle);

      sessionCard.x = midpointX + (this.circleRadius);
      sessionCard.y = midpointY + (this.circleRadius);

      sessionCard.distanceToCenter = sessionCard.distanceToCenter - 1;

      // spreek service aan

    } else {
      return;
    }
    if (sessionCard.distanceToCenter === 0) {
      alert(sessionCard.name + ' WINT');
    }
  }

  public endSession() {

  }
}
