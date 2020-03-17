import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-beading-inbox-mail',
  templateUrl: './beading-inbox-mail.component.html',
  styleUrls: ['./beading-inbox-mail.component.scss']
})
export class BeadingInboxMailComponent implements OnInit, OnDestroy {

  constructor(public route: Router, private _user_service: UserService) {
   
   }

  private subscription: Subscription = new Subscription();
  loading: any;
  emails: any = [];
  interval: any;
  loggedInUser:any = {};
  UnreadEmailCounter = 0;
  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem("user"));
    this.getEmails();
    for (let i = 0; i < this.emails.length; i++) {
      this.emails.push(`item ${i}`);
    }
    
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

  getSentEmails(){
    this._user_service.getSentEmails()
        .subscribe(
          data => {
            this.emails = data.data;
            // this.subscribeToData();
          })
    
  }

  subscribeToData() {
    this.subscription.add(
      Observable.timer(10000).subscribe(() => this.getEmails())
    );
  }

  viewBead(email) {
    this.route.navigate(['/view-bead' , {id : email._id} ]);
  }
  
}
