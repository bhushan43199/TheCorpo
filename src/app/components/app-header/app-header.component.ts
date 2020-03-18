import { Component } from '@angular/core';
import { AuthenticationService } from 'app/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  returnUrl: string = "";
  loggedInuser: any;
  profile_pic: any;
  name: any;
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public authenticationService: AuthenticationService) {
    this.loggedInuser = JSON.parse(localStorage.getItem('user'));
    this.profile_pic =  this.loggedInuser.LOGO;
    if(this.profile_pic == '' || this.profile_pic == undefined){
      this.profile_pic = "assets/img/avatars/8.jpg"
    }
    

  }
  logout() {
    this.authenticationService.isLogout();

    this._router.navigate(['/pages/home']);
  }


}
