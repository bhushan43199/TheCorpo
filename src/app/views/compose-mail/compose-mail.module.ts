import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComposeMailRoutingModule } from './compose-mail-routing.module';
import { ComposeMailComponent } from './compose-mail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ComposeMailRoutingModule,
    NgSelectModule,
    FormsModule,
    ToasterModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [ComposeMailComponent]
})
export class ComposeMailModule { }
