import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-view-bead',
  templateUrl: './view-bead.component.html',
  styleUrls: ['./view-bead.component.scss', '../../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewBeadComponent implements OnInit {
  htmlContent: any;
  editorFlag = false;
  email: any = {};
  replyObj: any = {}
  emailId: any;
  user:any = {};
  replyEmail :any;
  constructor(public route: Router, public router: ActivatedRoute,
     private spinnerService: Ng4LoadingSpinnerService, 
     private toasterService: ToasterService, 
     public user_service: UserService) {
 
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
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getEmailDataById(this.emailId);
    this.statusChange()
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
          console.log(this.email)
          if(this.email.ISACCEPT === true){
            this.getReplyEmailById();
          }          
        },
        error => {
          console.log(error)
        }
      )
  }

  isAccept(){
    this.spinnerService.show();
    this.user_service.isAccept(this.email)
      .subscribe(
        data => {
          if (data.verify == '1') {
            // this.usersList = data.data;
            this.editorFlag = true;
            this.toasterService.pop('success', 'Done', 'You have accepted this job..!!')
            this.spinnerService.hide();
          } else {
            this.toasterService.pop('error', 'ooops..', 'Something went wrong !')
            this.spinnerService.hide();
          }

        },
        error => {
          this.toasterService.pop('error', 'Server Error', 'Something went wrong !')
          this.spinnerService.hide();
          // this.loading = false;
        });
  }

  reply() {
    this.spinnerService.show();
    this.replyObj.TO = this.email.FROM,
    this.replyObj.FROM = this.email.TO
    this.replyObj.SUBJECT = this.email.SUBJECT;
    this.replyObj.EMAIL_ID  = this.email._id;
    this.user_service.replyEmail(this.replyObj)
      .subscribe(
        data => {
          if (data.verify == '1') {
            this.spinnerService.hide();
            this.toasterService.pop('success', 'Done', 'Email send...')
          } else {
            this.spinnerService.hide();
            this.toasterService.pop('error', 'ooops..', 'Something went wrong !')
          }
        },
        error => {
          this.toasterService.pop('error', 'Server Error', 'Something went wrong !')
        });
  }

  getReplyEmailById(){
    this.user_service.getReplyEmailById(this.email._id)
    .subscribe(
      data => {
        this.replyEmail = data.data;
        console.log(this.replyEmail);
      },
      error => {
        console.log(error)
      })
  }

}
