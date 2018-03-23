import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SessionService} from '../../../../services/session.service';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {Ring} from '../../../../model/ring';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-mastercircle',
  templateUrl: './mastercircle.component.html',
  styleUrls: ['./mastercircle.component.css']
})
export class MastercircleComponent implements OnInit, OnChanges {

  public sessions = [];
  public userId;
  @Input() public themeId;
  @Input() public selecting;
  public sessionCards = [];
  public alreadyExists = false;
  public toEditCard;
  circleRingSize;
  // helft van div width/height
  cardThickness = 15;
  // helft van div width/height
  circleRadius = 300;
  amountOfRings = 8;
  public rings = [];
  public angles = [];
  public noData = false;

  constructor(private sessionService: SessionService, private useridStorage: UseridStorage, private snackBar: MatSnackBar) {
    this.userId = useridStorage.getUserId();
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (!this.selecting) {
      this.sessionService.getSessionsOfTheme(this.themeId, this.userId).subscribe(data => {
        this.sessions = data;
      }, error => {

        this.snackBar.open('Fout bij ophalen sessies', 'x', {duration: 2000});

      }, () => {
        this.calculateSessionCards();

        const step = 100 / (this.amountOfRings);
        let z = 10;
        for (let i = 0; i < this.amountOfRings; i++) {
          this.rings.push(new Ring(step + (i * step), step + (i * step), z));
          z = z - 1;
        }

        for (let card of this.sessionCards) {
          card.distance = this.amountOfRings;
        }

        this.setCards();

        if (this.sessionCards.length == 0) {
          this.noData = true;
        }
      });
    }
  }

  calculateSessionCards() {
    for (const session of this.sessions) {
      for (let i = 0; i < session.sessionCardDtos.length; i++) {
        if (this.sessionCards.length != 0) {
          for (let j = 0; j < this.sessionCards.length; j++) {
            if (session.sessionCardDtos[i].name == this.sessionCards[j].name) {
              this.alreadyExists = true;
              this.toEditCard = j;
            }
          }
          if (this.alreadyExists != true) {
            this.sessionCards.push(session.sessionCardDtos[i]);
          } else {
            let mean = ((this.sessionCards[this.toEditCard].priority + session.sessionCardDtos[i].priority) / 2);
            this.sessionCards[this.toEditCard].priority = Math.ceil(mean);
          }
        } else {
          this.sessionCards.push(session.sessionCardDtos[i]);
        }
        this.alreadyExists = false;
      }
    }
  }

  // circle methods

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
}
