import { NgModule } from '@angular/core';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChangePasswordEqualValidator } from 'app/services/passwordvalidator';


@NgModule({
  imports: [ PagesRoutingModule, FormsModule , ToasterModule, ReactiveFormsModule, CommonModule,
    NgSelectModule ],
  declarations: [
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ChangePasswordEqualValidator
  ],
})
export class PagesModule { }
