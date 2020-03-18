import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Calendar
import { CalendarModule } from 'angular-calendar';

import { CalendarComponent } from './calendar.component';

//Routing
import { CalendarRoutingModule } from './calendar-routing.module';
import { ToasterModule } from 'angular2-toaster';
//
@NgModule({
  imports: [
    CalendarRoutingModule,
    CommonModule,
    CalendarModule.forRoot(),
    ToasterModule
  ],
  declarations: [
    CalendarComponent
  ]
})
export class CalendarInitModule { }
