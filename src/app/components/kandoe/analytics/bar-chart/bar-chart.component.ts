import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SessionService} from '../../../../services/session.service';
import {UseridStorage} from '../../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]

  }};
  public sessions= [];
  public userId;
  @Input() public themeId;
  @Input() public selecting;
  public sessionCardsMap = new Map();
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [
    {data: [], label: 'Meest gebruikte kaarten'}
  ];
  public noData = false;

  constructor(private sessionService: SessionService, private useridStorage: UseridStorage) {
    this.userId = useridStorage.getUserId();
  }
  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.selecting) {
      this.sessionService.getSessionsOfTheme(this.themeId, this.userId).subscribe(data => {
        this.sessions = data;
        console.log(data);
      }, error => {
        console.error('Error loading sessions!');
        console.log(error);
      }, () => {
        this.calculateMostPriority();
        if (this.sessions.length == 0) {
          this.noData = true;
        }
      });
    }
  }

  calculateMostPriority() {
    for (const session of this.sessions) {
      for (const sessionCard of session.sessionCardDtos) {
        if (this.sessionCardsMap.has(sessionCard.name)){
          let currentAmount = this.sessionCardsMap.get(sessionCard.name);
          this.sessionCardsMap.set(sessionCard.name, currentAmount + 1);
        } else{
          this.sessionCardsMap.set(sessionCard.name, 1);
        }
      }
    }
    let data = [];
    this.sessionCardsMap.forEach((value: number, key:string) => {
      console.log(key);
      this.barChartLabels.push(key);
      data.push(value);
    });
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

}
