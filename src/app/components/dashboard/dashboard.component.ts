import {Component, OnInit} from '@angular/core';

<<<<<<< HEAD
import {Title} from '@angular/platform-browser';

======
=
>>>>>>>
cb6e67564a345bf37e6e1b7087b6ec2f85d2b766;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'mytitle';

  constructor(private titleService: Title) {

  }

  ngOnInit() {
    this.titleService.setTitle(this.title);

  }
}
