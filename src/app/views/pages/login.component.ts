import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService, UserService } from 'app/services';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  model: any = {};
  returnUrl: string = "";
  loading = false;
  public data;
  passwordType: string = 'password';
  passwordShown: boolean = false;
  eyeIcon: String = 'fa fa-eye';
  user: any = {};
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public authenticationService: AuthenticationService,private spinnerService: Ng4LoadingSpinnerService,
    public userService: UserService,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  ngOnInit() {
    // this.authenticationService.isLogout();
    // this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    // this._router.navigate([this.returnUrl]);
  }

  togglePassword() {
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

  signin() {
    this.spinnerService.show();
    this.loading = true;
    this.authenticationService.login(this.model.EMAIL, this.model.PASSWORD)
      .subscribe(
        data => {

          if(data.verify!=0){
            this.spinnerService.hide();
            this.toasterService.pop('success','Login!', 'successfully!');
            this._router.navigate([this.returnUrl]);
          }else{
            this.spinnerService.hide();
            this.toasterService.pop('error','Login failed', 'Username or Password not match!');
          }            
        },
        error => {
          this.spinnerService.hide();
          this.toasterService.pop('error','Oppss..', 'Something went wrong!');
          this.loading = false;
        });
  }



}
