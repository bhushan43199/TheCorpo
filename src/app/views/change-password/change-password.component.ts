import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService, AuthenticationService } from 'app/services';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordType: string = 'password';
  passwordShown: boolean = false;
  eyeIcon: String = 'fa fa-eye';
  passwordType2: string = 'password';
  passwordShown2: boolean = false;
  eyeIcon2: String = 'fa fa-eye';
  public toasterService: ToasterService;
  public user: any = {};
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 10000
    });
  constructor(public authenticationService: AuthenticationService, private formBuilder: FormBuilder, toasterService: ToasterService, public userService: UserService, public router: Router, private SpinnerService: Ng4LoadingSpinnerService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
  }

  public togglePassword() {

    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password'
      this.eyeIcon = "fa fa-eye"
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
      this.eyeIcon = "fa fa-eye-slash";
    }
  }

  public togglePassword2() {

    if (this.passwordShown2) {
      this.passwordShown2 = false;
      this.passwordType2 = 'password'
      this.eyeIcon2 = "fa fa-eye"
    } else {
      this.passwordShown2 = true;
      this.passwordType2 = 'text';
      this.eyeIcon2 = "fa fa-eye-slash";
    }
  }

  changePassword() {
    this.SpinnerService.show();
    this.userService.changePassword(this.user)
      .subscribe(
        data => {
          if (data.verify != 1) {
            this.SpinnerService.hide();
            this.toasterService.pop('error', 'Error', 'Email not match');
          }
          else {
            this.SpinnerService.hide();
            this.toasterService.pop('success', 'Done', 'Password has been Change...');
            this.authenticationService.isLogout();
            this.router.navigate(['/pages/home']);
    
          }
        },
        error => {
          this.SpinnerService.hide();
          console.log(error);
        });
  };
}
