import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';
import {SessionService} from '../../../../services/session.service';
import {Session} from '../../../../model/session';
import {Snapshot} from '../../../../model/snapshot';

@Component({
  selector: 'app-snapshots',
  templateUrl: './snapshots.component.html',
  styleUrls: ['./snapshots.component.css']
})
export class SnapshotsComponent implements OnInit {

  public userId;
  public sessionId;
  public session = new Session(0, 'Geen snapshots', 0, 0, 0, 0, 0, [''], [''], [], [], 0, [], null, false, new Date(), false, 0, []);
  public currentSnapshot = new Snapshot(0, [], [], 0, new Date());
  public messages = [];
  public snapShotIndex = 0;

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
}
