import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public data: any;
  public user:any={};
  public userRoles=[
    {label:"Admin", value:"admin"},
    {label:"User", value:"user"},
    {label:"Venue Provider", value:"venue provider"}
  ];
  public genders= [
    {label:"Male", value:"male"},
    {label:"Female", value:"female"}
  ]
  constructor() { }

  ngOnInit() {
    
    this.data = [
      {
        img:"assets/img/xs/avatar1.jpg",
        name:"jhon smith",
        phone:"264-625-2583",
        email:"johnsmith@gmail.com",
        address:"123 6th St. Melbourne, FL 32904",
        userType:"Admin"
      },
      {
        img:"assets/img/xs/avatar2.jpg",
        name:"Hossein Shams	",
        phone:"264-625-5689",
        email:"hosseinshams@gmail.com",
        address:"44 Shirley Ave. West Chicago, IL 60185",
        userType:"User"
      },
      {
        img:"assets/img/xs/avatar3.jpg",
        name:"Maryam Amiri",
        phone:"264-625-9513",
        email:"maryamamiri@gmail.com",
        address:"123 6th St. Melbourne, FL 32904",
        userType:"Venue Provider"
      },
      {
        img:"assets/img/xs/avatar4.jpg",
        name:"Tim Hank",
        phone:"264-625-1212",
        email:"timhank@gmail.com",
        address:"70 Bowman St. South Windsor, CT 06074",
        userType:"Venue Provider"
      },


    ]
  }

}
