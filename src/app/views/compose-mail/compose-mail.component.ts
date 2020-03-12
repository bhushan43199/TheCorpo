import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss']
})
export class ComposeMailComponent implements OnInit {
  user: any = {};
  selected = 1;
  userType = [
    { label: "User", value: 1 },
    { label: "Venue Provider", value: 2 },
  ]
  radioChecku = "true";
  radioCheckv = "false";
  users = [];
  usersList: any = [];
  usersFilterList:any =[];
  constructor() {
   
  }

  ngOnInit() {
    this.usersList = [
      {
        value: "1",
        label: "Abc",
        type: "u"
      },
      {
        value: "2",
        label: "Xyz",
        type: "v"
      },
      {
        value: "3",
        label: "Pqr",
        type: "u"
      },
      {
        value: "4",
        label: "Qwe",
        type: "v"
      },
      {
        value: "5",
        label: "Yui",
        type: "u"
      },

    ]


  }
  filterUsers(data) {
    console.log(data)
    if (data.value == 1) {

      this.usersFilterList = this.usersList.filter(x => x.type === "u");

    } else {
      this.usersFilterList = this.usersList.filter(x => x.type === "v");
    }
  }


}
