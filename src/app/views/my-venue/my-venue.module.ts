import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyVenueRoutingModule } from './my-venue-routing.module';
import { MyVenueComponent } from './my-venue.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ToasterModule } from 'angular2-toaster';
@NgModule({
  imports: [
    CommonModule,
    MyVenueRoutingModule,
    NgxDropzoneModule,
    ToasterModule
  ],
  declarations: [MyVenueComponent]
})
export class MyVenueModule { }
