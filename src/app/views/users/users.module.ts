import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { UserDataFilterPipe } from './datafilterpipe';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    DataTableModule,
    FormsModule,
  ],
  declarations: [UsersComponent, UserDataFilterPipe]
})
export class UsersModule { }
