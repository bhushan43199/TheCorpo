import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyVenueRoutingModule } from './my-venue-routing.module';
import { MyVenueComponent } from './my-venue.component';

@NgModule({
  imports: [
    CommonModule,
    MyVenueRoutingModule
  ],
  declarations: [MyVenueComponent]
})
export class MyVenueModule { }
