import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-phase2',
  templateUrl: './phase2.component.html',
  styleUrls: ['./phase2.component.css']
})
export class Phase2Component implements OnInit {
  private sessionId;


  constructor(private route: ActivatedRoute) {
    this.sessionId = this.route.snapshot.params['sessionId'];

  }

  ngOnInit() {
  }



  

}
