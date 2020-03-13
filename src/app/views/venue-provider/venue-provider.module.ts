import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenueProviderRoutingModule } from './venue-provider-routing.module';
import { VenueProviderComponent } from './venue-provider.component';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { VenueProviderDataFilterPipe } from './datafilterpipe';
import { ModalModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
    CommonModule,
    VenueProviderRoutingModule,
    DataTableModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    NgSelectModule,
    ToasterModule
  ],
  declarations: [VenueProviderComponent, VenueProviderDataFilterPipe]
})
export class VenueProviderModule { }
