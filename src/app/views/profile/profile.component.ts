import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  imgURL: any;
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  USERTYPE_ROLE = [{ name: 'Orgenizer', value: "o" }];
  public profile :any={};
  public organizer;
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
  user: any=[];

  constructor() { }

  ngOnInit() {
  }

}
