import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services';

@Component({
  selector: 'app-venue-provider',
  templateUrl: './venue-provider.component.html',
  styleUrls: ['./venue-provider.component.scss']
})
export class VenueProviderComponent implements OnInit {
  public data: any;
  public user: any = {};
  public genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ]
  constructor(public userService: UserService) {
    this.getAllVenueProviders()
  }

  ngOnInit() {
    this.data = [
      {
        img: "assets/img/xs/avatar1.jpg",
        name: "jhon smith",
        phone: "264-625-2583",
        email: "johnsmith@gmail.com",
        address: "123 6th St. Melbourne, FL 32904"
      },
      {
        img: "assets/img/xs/avatar2.jpg",
        name: "Hossein Shams	",
        phone: "264-625-5689",
        email: "hosseinshams@gmail.com",
        address: "44 Shirley Ave. West Chicago, IL 60185"
      },
      {
        img: "assets/img/xs/avatar3.jpg",
        name: "Maryam Amiri",
        phone: "264-625-9513",
        email: "maryamamiri@gmail.com",
        address: "123 6th St. Melbourne, FL 32904"
      },
      {
        img: "assets/img/xs/avatar4.jpg",
        name: "Tim Hank",
        phone: "264-625-1212",
        email: "timhank@gmail.com",
        address: "70 Bowman St. South Windsor, CT 06074"
      },


    ]
  }

  getAllVenueProviders() {
    this.userService.getAllVenueProviders()
      .subscribe(
        data => {
          console.log(data)
        },
        err => {
          console.log(err)
        }
      )

  }

}
