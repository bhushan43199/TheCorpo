import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/services';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-venue-provider',
  templateUrl: './venue-provider.component.html',
  styleUrls: ['./venue-provider.component.scss', '../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VenueProviderComponent implements OnInit {
  public data: any;
  public user: any = {};
  imageList = [];
  public venueProviderList:any;
  public venueProviderDetail:any = {};
  seeVenueDetPage = false;
  loggedInUserRole:any;
  public genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ]
  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
  });
  constructor(public userService: UserService, private toasterService: ToasterService) {
    this.getAllVenueProviders();
    this.loggedInUserRole = localStorage.getItem('ROLE')
  }

  hideVenueId(){
    this.seeVenueDetPage = false;
  }
  seeVenueId(venueData){
    this.seeVenueDetPage = true;
    this.venueProviderDetail = venueData; 
    this.getVenueImagebyId()
  }
  getVenueImagebyId() {
    var id = this.venueProviderDetail._id
    this.userService.getVenueImagebyId(id)
      .subscribe(
        data => {
         this.imageList = data.data;
        //  this.imageList.forEach(element => {
        //   element.IMG_PATH = "http://localhost:4200" + element.IMG_PATH
        //  });
        },
        error => {
          console.log(error)
        }
      )
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
         
          if (data.verify == '1') {
            this.venueProviderList = data.data;
          } else {
            this.toasterService.pop('error', 'ooops..', 'Something went wrong !')
          }
        },
        err => {
          console.log(err)
        })
  }

}
