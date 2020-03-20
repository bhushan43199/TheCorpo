import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  } from '../my-venue/my-venue.component';
import { ChangePasswordComponent } from './change-password.component';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent,
    data: {
      title: 'Change Password'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule {}
