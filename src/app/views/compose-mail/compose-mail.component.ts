import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/services';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss' , '../../../scss/vendors/toastr/toastr.scss'],
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
  constructor(private _user_service: UserService, private toasterService: ToasterService) {
    this.getAllRegisterdUsers();
    this.loggedInUser = JSON.parse (localStorage.getItem('user'));
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
    this.composeObj.FROM = this.loggedInUser.EMAIL;
    this._user_service.sendMail(this.composeObj)
      .subscribe(
        data => {
          if (data.verify == '1') {
            // this.usersList = data.data;
            this.toasterService.pop('success', 'Done', 'Email send...')
          } else {
            this.toasterService.pop('error', 'ooops..', 'Something went wrong !')
          }

        },
        error => {
          this.toasterService.pop('error', 'Server Error', 'Something went wrong !')
          this.loading = false;
        });
  
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
