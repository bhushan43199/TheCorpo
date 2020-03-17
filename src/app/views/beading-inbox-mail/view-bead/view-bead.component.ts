import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-view-bead',
  templateUrl: './view-bead.component.html',
  styleUrls: ['./view-bead.component.scss']
})
export class ViewBeadComponent implements OnInit {
  htmlContent: any;
  editorFlag = false;
  email: any = {};
  replyObj: any = {}
  emailId: any;
  constructor(public route: Router, public router: ActivatedRoute, private toasterService: ToasterService, public user_service: UserService) {
    // var previousPageData = this.route.getCurrentNavigation();
    // var data = {
    //   _id: "5e6bc4a4b2d93f088405c0d6",
    //   TO: "flemingparmar7895@gmail.com",
    //   FROM: "sahilparmar1810@gmail.com",
    //   SUBJECT: "Testing Mail",
    //   MESSAGE: "Hello, Im doing testing for it ",
    //   STATUS: true,
    //   ISREAD: false,
    //   CREATED_DATE: "2020-03-13T17:36:36.701Z"
    // };
    // this.email = data;
  }
  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
  });
  ngOnInit() {
    this.htmlContent = 'Hello there,  <br/> <p>The toolbar can be customized and it also supports various callbacks such as <code>oninit</code>, <code>onfocus</code>, <code>onpaste</code> and many more.</p> <p>Please try <b>paste some texts</b> here</p>';
    this.emailId = this.router.snapshot.paramMap.get('id');
    // console.log(this.emailId)
    this.getEmailDataById(this.emailId);
    // this.statusChange()
  }

  editorOpen() {
    this.editorFlag = true;
  }
  editorClose() {
    this.editorFlag = false;
  }
  statusChange() {
    var data = {
      _id: this.emailId
    }
    this.user_service.emailReadStatus(data)
      .subscribe(
        data => {

        },
        error => {
          console.log(error);
        }
      )
  }
  getEmailDataById(id) {
    this.user_service.getEmailDataById(id)
      .subscribe(
        data => {
          // console.log(data);
          this.email = data.data;
        },
        error => {
          console.log(error)
        }
      )
  }
  reply() {

    this.replyObj.TO = this.email.FROM,
    this.replyObj.FROM = this.email.TO
    console.log(this.replyObj)
    this.user_service.sendMail(this.replyObj)
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
          // this.loading = false;
        });
  }

}
