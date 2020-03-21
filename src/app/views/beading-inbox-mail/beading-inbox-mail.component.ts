import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-beading-inbox-mail',
  templateUrl: './beading-inbox-mail.component.html',
  styleUrls: ['./beading-inbox-mail.component.scss','../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BeadingInboxMailComponent implements OnInit, OnDestroy {

  constructor(public route: Router, private _user_service: UserService) {
   
   }

  private subscription: Subscription = new Subscription();
  loading: any;
  emails: any = [];
  sentEmails:any = [];
  interval: any;
  loggedInUser:any = {};
  inbox:any = true;
  sent:any = false;
  deleteEmails :any = [];

  unReadCount:any = 0;

  UnreadEmailCounter = 0;
  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem("user"));
    this.getEmails();
    this.getUnReadEmails();
    // for (let i = 0; i < this.emails.length; i++) {
    //   this.emails.push(`item ${i}`);
    // }
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getEmails() {
    this.subscription.add(
      this._user_service.getEmails()
        .subscribe(
          data => {
            this.emails = data.data;
            this.subscribeToData();
          })
    );
  }

  getUnReadEmails() {
    this.subscription.add(
      this._user_service.getUnReadEmails()
        .subscribe(
          data => {
            // this.emails = data.data;
            this.unReadCount = data.data.length;
            this.subscribeUnReadEmailData();
          })
    );
  }

  getSentEmails(){
    this.inbox = false;
    this.sent = true;
    this._user_service.getSentEmails()
        .subscribe(
          data => {
            this.sentEmails = data.data;
            // this.subscribeToData();
          });
  }

  openInbox(){
    this.inbox = true;
    this.sent = false;
  }

  subscribeToData() {
    this.subscription.add(
      Observable.timer(10000).subscribe(() => this.getEmails())
    );
  }

  subscribeUnReadEmailData() {
    this.subscription.add(
      Observable.timer(10000).subscribe(() => this.getUnReadEmails())
    );
  }

  viewBead(email, status) {
    if(!email.ISREAD){
      this.statusChange(email);
    }   
    this.route.navigate(['/view-bead' , {id : email._id} ]);
  }
  
  statusChange(email) {
    var data = {
      _id:email._id
    }
    this._user_service.emailReadStatus(data)
      .subscribe(
        data => {
          
        },
        error => {
          console.log(error);
        }
      )
  }
}
