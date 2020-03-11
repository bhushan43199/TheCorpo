import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss']
})
export class ComposeMailComponent implements OnInit {
  user: any = {};
  radioChecku = "true";
  radioCheckv = "false";
  users = [];
  usersList: any = [];
  constructor() {
    this.user.users = "true"
  }

  ngOnInit() {
    this.usersList = [
      {
        id: "1",
        name: "Abc",
        type: "u"
      },
      {
        id: "2",
        name: "Xyz",
        type: "v"
      },
      {
        id: "3",
        name: "Pqr",
        type: "u"
      },
      {
        id: "4",
        name: "Qwe",
        type: "v"
      },
      {
        id: "5",
        name: "Yui",
        type: "u"
      },

    ]
   this.filterList();

  }
  filterList() {
    alert(this.user.users)
    var temp = []
    for (var i = 0; i < this.usersList.length; i++) {
      if (this.usersList[i].type == "u") {
        temp.push({ label: this.usersList[i].name, value: this.usersList[i].id })
      }
    }
    this.users = temp;
   
  }

}
