import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBeadComponent } from './view-bead.component';

const routes: Routes = [
  {
    path: '',
    component: ViewBeadComponent,
    data: {
      title: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewBeadRoutingModule { }
