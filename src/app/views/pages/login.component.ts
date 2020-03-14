import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService, UserService } from 'app/services';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  templateUrl: 'login.component.html'
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
    public authenticationService: AuthenticationService,
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
    this.loading = true;
    this.authenticationService.login(this.model.EMAIL, this.model.PASSWORD)
      .subscribe(
        data => {
          // this.showSuccess('Success login');                   
          this._router.navigate([this.returnUrl]);
        },
        error => {
          // this.showError(error.statusText);
          this.loading = false;
        });
  }

  showSuccess(msg) {
    this.toasterService.pop('Login!', 'successfully!', msg);
  }

  showError(msg) {
    this.toasterService.pop('Username Or Password Invalid', 'error!', msg);
  }
  // doLogin(){
  //   if (this.user.username == "admin" && this.user.password == "admin")
  //   {
  //     this.router.navigate(['/pages/register']);
  //   }
  //   else
  //   {
  //     alert('Login failed..!');
  //   }
  // }

}
