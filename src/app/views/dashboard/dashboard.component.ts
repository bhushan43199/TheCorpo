import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { UserService } from 'app/services';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  loading: any;
  userlist: any = [];
  adminsCount: any = 0;
  usersCount: any = 0;
  venueCount: any = 0;

  constructor(private toasterService: ToasterService,
    private _user_service: UserService) { }

  ngOnInit() {
    this.getAllRegisterdUsers();
  }

  getAllRegisterdUsers() {
    this.loading = true;
    this._user_service.getAllRegisterdUsers()
      .subscribe(
        data => {
          if (data.verify == '1') {
            var userlist = data.data;
            userlist.forEach(element => {
              if (element.ROLE === 1) {
                this.adminsCount++;
              } else if (element.ROLE === 2) {
                this.venueCount++;
              } else {
                this.usersCount++;
              }
            });
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
