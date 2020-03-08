import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComposeMailComponent } from './compose-mail.component';

const routes: Routes = [
  {
    path: '',
    component: ComposeMailComponent,
    data: {
      title: 'Compose'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComposeMailRoutingModule { }
