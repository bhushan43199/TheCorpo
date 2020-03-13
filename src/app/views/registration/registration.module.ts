import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { RegistrationDataFilterPipe } from './datafilterpipe';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { ChangePasswordEqualValidator } from 'app/services/passwordvalidator';
@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ModalModule.forRoot(),
    DataTableModule,
    FormsModule,
    NgSelectModule,
    ToasterModule
    
  ],
  declarations: [RegistrationComponent,RegistrationDataFilterPipe,ChangePasswordEqualValidator]
})
export class RegistrationModule { }
