import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComposeMailRoutingModule } from './compose-mail-routing.module';
import { ComposeMailComponent } from './compose-mail.component';

@NgModule({
  imports: [
    CommonModule,
    ComposeMailRoutingModule
  ],
  declarations: [ComposeMailComponent]
})
export class ComposeMailModule { }
