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
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { RegisterEqualValidator } from 'app/services/registerValidator';
@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ModalModule.forRoot(),
    DataTableModule,
    FormsModule,
    NgSelectModule,
    ToasterModule,
    Ng4LoadingSpinnerModule.forRoot()
    
  ],
  declarations: [RegistrationComponent, RegistrationDataFilterPipe, RegisterEqualValidator]
})
export class RegistrationModule { }
