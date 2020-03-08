import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
 
   user :any = {}; 
  constructor(private router: Router) { }

  submit(){

    
   
  }
register()
{

}

doLogin(){
  if (this.user.username == "admin" && this.user.password == "admin")
  {
    this.router.navigate(['/pages/register']);
  }
  else
  {
    alert('Login failed..!');
  }
}

}
