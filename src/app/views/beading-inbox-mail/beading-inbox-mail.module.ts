import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BeadingInboxMailComponent } from './beading-inbox-mail.component';
import { BeadingInboxMainRoutingModule } from './beading-inbox-mail-routing.module';
import { AceEditorModule } from 'ng2-ace-editor';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'angular2-datatable';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewBeadComponent } from './view-bead/view-bead.component';


@NgModule({
  imports: [
    FormsModule,
    BeadingInboxMainRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AceEditorModule,
    CommonModule,
    DataTableModule,
    ModalModule.forRoot(),
    ToasterModule,
    TooltipModule.forRoot(),
    NgSelectModule
  ],
  declarations: [ BeadingInboxMailComponent ]
})
export class BeadingMailModule { }
