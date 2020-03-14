import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/services';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss',
    '../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  public toggleButton: boolean = true;
  public imgURL;
  loading: any;
  // bsValue: Date = new Date();
  user: any = {};
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  constructor(private _user_service: UserService, private toasterService: ToasterService) {
    this.imgURL = "assets/img/avatars/8.jpg";

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"))
    this.user.DOB = new Date();
  }
  enable() {
    this.toggleButton = false;
  }

  disable() {
    this.toggleButton = true;
  }

  onAdd(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgURL = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  updateProfile() {
    this.loading = true;
    this._user_service.updateProfile(this.user)
      .subscribe(
        data => {
          if (data.verify == '1') {
            localStorage.setItem('user', JSON.stringify(data.data));
            this.toasterService.pop('success', 'Done', 'User Updated');
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
