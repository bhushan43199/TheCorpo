import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/services';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  userlist: any = [];
  public data: any;
  public user: any = {};
  loggedInUserRole: any;
  public genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ];
  loading: any;
  
  constructor(private _user_service: UserService, private toasterService: ToasterService,public spinnerService:Ng4LoadingSpinnerService) {
    this.getAllRegisterdUsers();
    this.loggedInUserRole = localStorage.getItem('ROLE')
  }

  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
  });

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


  getAllRegisterdUsers() {
    this.spinnerService.show();
    this._user_service.getAllRegisterdUsers()
      .subscribe(
        data => {
          if (data.verify == '1') {
            this.spinnerService.hide();
            this.userlist = data.data;
            this.userlist = this.userlist.filter(data => data.ROLE == 3);
          } else {
            this.spinnerService.hide();
            this.toasterService.pop('error', 'ooops..', 'Something went wrong !')
          }
        },
        error => {
          this.spinnerService.hide();
          console.log(error);
          this.toasterService.pop('error', 'Server Error', 'Something went wrong !')
        });
  }

  updateUser() {
    this.spinnerService.show()
    this.loading = true;
    this._user_service.updateUser(this.user)
      .subscribe(
        data => {
          if (data.verify == '1') {
            this.spinnerService.hide();
            this.toasterService.pop('success', 'Done', 'User Updated');
            this.getAllRegisterdUsers();
          } else {
            this.spinnerService.hide();
            this.toasterService.pop('error', 'ooops..', 'Something went wrong !')
          }
        },
        error => {
          this.spinnerService.hide();
          this.toasterService.pop('error', 'Server Error', 'Something went wrong !')
          this.loading = false;
        });
  }

}
