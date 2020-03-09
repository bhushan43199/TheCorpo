import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AceEditorModule } from 'ng2-ace-editor';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'angular2-datatable';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewBeadComponent } from './view-bead.component';
import { ViewBeadRoutingModule } from './view-bead.routing';
import { NgxEditorModule } from 'ngx-editor'
import {  HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    FormsModule,
    ViewBeadRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AceEditorModule,
    CommonModule,
    DataTableModule,
    ModalModule.forRoot(),
    ToasterModule,
    TooltipModule.forRoot(),
    NgSelectModule,
    NgxEditorModule,
    HttpClientModule
  ],
  declarations: [ViewBeadComponent ]
})
export class ViewBeadModule { }
