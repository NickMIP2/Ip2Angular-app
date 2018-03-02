import {Component, Input, OnInit} from '@angular/core';
import {Theme} from '../../../model/theme';
import {User} from '../../../model/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-themedetail',
  templateUrl: './themedetail.component.html',
  styleUrls: ['./themedetail.component.css']
})

export class ThemedetailComponent implements OnInit {
  public user: User = {id: 1, email: 'quinten.didden@student.kdg.be', lastName: 'Didden', firstName: 'Quinten', organisor: 'true'};
  @Input() public theme: Theme = {
    id: 10,
    themename: 'Reizen',
    themedescription: 'op reis',
    themetag: 'reis',
    themeUsers: [this.user.email]
  };

  private sub;
  private id;

  constructor(private route: ActivatedRoute) {
  }


  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['themeId']; // (+) converts string 'id' to a number
    });
  }

}
