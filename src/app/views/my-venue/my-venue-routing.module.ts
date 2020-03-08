import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyVenueComponent } from './my-venue.component';

const routes: Routes = [
  {
    path: '',
    component: MyVenueComponent,
    data: {
      title: 'My Venue'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyVenueRoutingModule {}
