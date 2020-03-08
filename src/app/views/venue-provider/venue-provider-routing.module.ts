import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VenueProviderComponent } from './venue-provider.component';

const routes: Routes = [
  {
    path: '',
    component: VenueProviderComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenueProviderRoutingModule { }
