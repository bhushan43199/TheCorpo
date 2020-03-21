import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { UserDataFilterPipe } from './datafilterpipe';
import { ModalModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToasterModule } from 'angular2-toaster';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { UserEqualValidator } from 'app/services/userPassValidator';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ModalModule.forRoot(),
    DataTableModule,
    FormsModule,
    NgSelectModule,
    ToasterModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [UsersComponent, UserDataFilterPipe, UserEqualValidator]
})
export class UsersModule { }
