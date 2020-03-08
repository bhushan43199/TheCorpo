import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBeadComponent } from './view-bead.component';

const routes: Routes = [
  {
    path: '',
    component: ViewBeadComponent,
    data: {
      title: 'Loading Buttons - Ladda'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewBeadRoutingModule { }
