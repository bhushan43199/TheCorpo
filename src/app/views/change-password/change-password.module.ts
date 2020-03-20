import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterModule } from 'angular2-toaster';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ChangePasswordEqualValidator } from 'app/services/passwordvalidator';
@NgModule({
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    ToasterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [ChangePasswordComponent,ChangePasswordEqualValidator]
})
export class ChangePasswordModule { }
