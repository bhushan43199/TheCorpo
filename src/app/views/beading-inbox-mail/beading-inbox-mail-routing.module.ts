import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { BeadingInboxMailComponent } from './beading-inbox-mail.component';

const routes: Routes = [
  {
    path: '',
    component: BeadingInboxMailComponent,
    data: {
      title: 'Dashboard'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeadingInboxMainRoutingModule {}
