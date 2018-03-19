import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kandoe',
  templateUrl: './kandoe.component.html',
  styleUrls: ['./kandoe.component.css']
})
export class KandoeComponent implements OnInit {

  @Input() sessionCard;

  constructor() {
  }

  ngOnInit() {
  }

}
