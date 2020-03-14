import { Component } from '@angular/core';
import { AuthenticationService } from 'app/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  returnUrl: string = "";
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public authenticationService: AuthenticationService) { }
  logout() {
    this.authenticationService.isLogout();
   
    this._router.navigate(['/pages/home']);
  }
}
