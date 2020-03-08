import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenueProviderRoutingModule } from './venue-provider-routing.module';
import { VenueProviderComponent } from './venue-provider.component';

@NgModule({
  imports: [
    CommonModule,
    VenueProviderRoutingModule
  ],
  declarations: [VenueProviderComponent]
})
export class VenueProviderModule { }
