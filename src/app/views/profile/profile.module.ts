import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';
import { ToasterModule } from 'angular2-toaster';
import { FileUploadModule } from 'ng2-file-upload';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    SelectModule,
    ToasterModule,
    BsDatepickerModule.forRoot(),
    FileUploadModule,
    Ng4LoadingSpinnerModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
