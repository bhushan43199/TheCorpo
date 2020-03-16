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

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ModalModule.forRoot(),
    DataTableModule,
    FormsModule,
    NgSelectModule,
    ToasterModule
  ],
  declarations: [UsersComponent, UserDataFilterPipe]
})
export class UsersModule { }
