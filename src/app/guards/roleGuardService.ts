import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import * as decode  from 'jwt-decode';
import { AuthenticationService } from '../services';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const token = JSON.parse(localStorage.getItem('token'));
    if (!token){
      this.router.navigate(['pages/login']);
      return false;      
    }
    const tokenPayload = decode(token);
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;
    const USERTYPE_ROLE = tokenPayload.user.USERTYPE_ROLE;
    let  expectedRole = '';
 
    for(let i=0; i<expectedRoleArray.length; i++){
      if(expectedRoleArray[i] == tokenPayload.user.USERTYPE_ROLE){
        expectedRole = tokenPayload.user.USERTYPE_ROLE;
      }
    }

    if (!this.auth.isAuthenticated() || USERTYPE_ROLE != expectedRole) {   
      return false;
    }   
    return true;
  }

}