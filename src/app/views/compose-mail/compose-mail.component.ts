import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/services';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss' , '../../../scss/vendors/toastr/toastr.scss',
  '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComposeMailComponent implements OnInit {
  composeObj: any = {};
  loggedInUser:any;
  user: any = {};
  loading: any;
  selected = 1;
  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
  });
  userType = [
    { label: "User", value: 1 },
    { label: "Venue Provider", value: 2 },
  ]
  radioChecku = "true";
  radioCheckv = "false";
  users = [];
  usersList: any = [];
  usersFilterList: any = [];
  constructor(private _user_service: UserService, private toasterService: ToasterService, private spinnerService: Ng4LoadingSpinnerService) {
    this.getAllRegisterdUsers();
    this.loggedInUser = JSON.parse (localStorage.getItem('user'));
    this.composeObj.START_DATE = new Date()
    this.composeObj.END_DATE = new Date()
  }

  ngOnInit() {
    // this.usersList = [
    //   {
    //     value: "1",
    //     label: "Abc",
    //     type: "u"
    //   },
    //   {
    //     value: "2",
    //     label: "Xyz",
    //     type: "v"
    //   },
    //   {
    //     value: "3",
    //     label: "Pqr",
    //     type: "u"
    //   },
    //   {
    //     value: "4",
    //     label: "Qwe",
    //     type: "v"
    //   },
    //   {
    //     value: "5",
    //     label: "Yui",
    //     type: "u"
    //   },

    // ]


  }

  sendMail() {
    this.spinnerService.show();
    this.composeObj.FROM = this.loggedInUser.EMAIL;
    this._user_service.sendMail(this.composeObj)
      .subscribe(
        data => {
          if (data.verify == '1') {
            // this.usersList = data.data;
            this.toasterService.pop('success', 'Done', 'Email send...');
            this.clearData();
            this.spinnerService.hide();
   
          } else {
            this.toasterService.pop('error', 'ooops..', 'Something went wrong !');
            this.spinnerService.hide();
          }

        },
        error => {
          this.toasterService.pop('error', 'Server Error', 'Something went wrong !');
          this.spinnerService.hide();
          this.loading = false;
        });
  
}
clearData(){
  this.userType = [];
  this.composeObj.TO = [];
  this.composeObj.SUBJECT = "";
  this.composeObj.PRICE = ""
  this.composeObj.MESSAGE = ""
  this.composeObj.PLACE = ""
  this.composeObj.START_DATE = new Date();
  this.composeObj.END_DATE = new Date();
}
keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode !== 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

filterUsers(data) {

  if (data.value == 1) {
    var temp = this.usersList.filter(x => x.ROLE === 3);
    var tempList = [];
    temp.forEach(element => {
      tempList.push({ label: element.EMAIL, value: element.EMAIL })
    });
    this.usersFilterList = tempList;
  } else {
    var temp = this.usersList.filter(x => x.ROLE === 2);
    var tempList = [];
    temp.forEach(element => {
      tempList.push({ label: element.EMAIL, value: element.EMAIL })
    });
    this.usersFilterList = tempList;

  }
}
getAllRegisterdUsers() {
  this.loading = true;
  this._user_service.getAllRegisterdUsers()
    .subscribe(
      data => {
        if (data.verify == '1') {
          this.usersList = data.data;
        } else {
          this.toasterService.pop('error', 'ooops..', 'Something went wrong !')
        }

      },
      error => {
        this.toasterService.pop('error', 'Server Error', 'Something went wrong !')
        this.loading = false;
      });
}

}
