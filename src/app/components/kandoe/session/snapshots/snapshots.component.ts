import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {SessionService} from '../../../../services/session.service';
import {Session} from '../../../../model/session';
import {Snapshot} from '../../../../model/snapshot';
import {Ring} from '../../../../model/ring';

@Component({
  selector: 'app-snapshots',
  templateUrl: './snapshots.component.html',
  styleUrls: ['./snapshots.component.css']
})
export class SnapshotsComponent implements OnInit, OnChanges {

  public userId;
  public sessionId;
  public session = new Session(0, 'Geen snapshots', 0, 0, 0, 0, 0, [''], [''], [], [], 0, [], null, false, new Date(), false, 0, []);
  public currentSnapshot = new Snapshot(0, [], [], 0, new Date());
  public messages = [];
  public snapShotIndex = 0;
  circleRingSize;
  // helft van div width/height
  cardThickness = 15;
  // helft van div width/height
  circleRadius = 300;
  amountOfRings = 8;
  public rings = [];
  public angles = [];
  public index;
  public sessionCards = [];

  constructor(private router: Router, private route: ActivatedRoute, private sessionService: SessionService, private useridStorage: UseridStorage) {
    this.userId = useridStorage.getUserId();
    this.sessionId = this.route.parent.snapshot.params['sessionId'];
  }

  ngOnInit() {
    window.document.title = 'Snapshots';

    this.sessionService.getSession(this.sessionId, this.userId).subscribe(data => {
        this.session = data;
      },
      error => {
        console.error('Error loading session!');
        console.log(error);
        alert('Error loading session');
      }, () => {
      if (this.session.snapshotDtos.length > this.snapShotIndex) {
        this.currentSnapshot = this.session.snapshotDtos[this.snapShotIndex];

        this.sessionService.getMessagesOfBeforeSnapshot(this.currentSnapshot.id, this.sessionId, this.userId).subscribe(data => {
            this.messages = data;
          },
          error => {
            console.error('Error loading messages!');
            console.log(error);
            alert('Error loading messages');
          }, () => {

          for (let sessionCardId of this.currentSnapshot.sessionCardIds){
            //for (let sessionCard of this.session.)
          }

            const step = 100 / (this.amountOfRings);
            let z = 10;
            for (let i = 0; i < this.amountOfRings; i++) {
              this.rings.push(new Ring(step + (i * step), step + (i * step), z));
              z = z - 1;
            }
          });
      }
      });
  }

  nextSnapshot() {
    this.snapShotIndex++;

    if (this.session.snapshotDtos.length > this.snapShotIndex) {
      this.currentSnapshot = this.session.snapshotDtos[this.snapShotIndex];

      this.sessionService.getMessagesOfBeforeSnapshot(this.currentSnapshot.id, this.sessionId, this.userId).subscribe(data => {
          this.messages = data;
        },
        error => {
          console.error('Error loading messages!');
          console.log(error);
          alert('Error loading messages');
        });
    } else {
      this.snapShotIndex--;
    }
  }

  perviousSnapshot() {
    if (this.snapShotIndex != 0) {
      this.snapShotIndex--;

      this.currentSnapshot = this.session.snapshotDtos[this.snapShotIndex];

      this.sessionService.getMessagesOfBeforeSnapshot(this.currentSnapshot.id, this.sessionId, this.userId).subscribe(data => {
          this.messages = data;
        },
        error => {
          console.error('Error loading messages!');
          console.log(error);
          alert('Error loading messages');
        });
    }
  }

  // circle methods

  ngOnChanges(changes: SimpleChanges): void {
    for (let card of this.sessionCards) {
      card.distance = this.amountOfRings;
    }

    this.setCards();
  }

  public setCards() {
    this.circleRingSize = this.circleRadius / (this.amountOfRings);
    let index = 0;
    console.log('setcard' + this.currentSnapshot.sessionCardIds.length);
    for (index; index < this.currentSnapshot.sessionCardIds.length; index++) {

      const angleDegrees = ((360 / this.currentSnapshot.sessionCardIds.length) * index);

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
}
