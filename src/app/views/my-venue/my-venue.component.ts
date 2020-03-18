import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from 'app/services';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { appConfig } from 'app/app.config';

@Component({
  selector: 'app-my-venue',
  templateUrl: './my-venue.component.html',
  styleUrls: ['./my-venue.component.scss']
})
export class MyVenueComponent implements OnInit {

  constructor(private elementRef: ElementRef, private _user_service: UserService, 
    private toasterService: ToasterService, private http: HttpClient) {
  }
  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
    // console.log(this.files);
    this.uploadSubmit();
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  ngOnInit() {
  }


  uploadFile(data: FormData) {
    this.http.post(appConfig.apiUrl + '/user/venueImagesUpload', data, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
        }
      });
  }

  uploadSubmit() {
    for (let i = 0; i < this.files.length; i++) {
      let fileItem = this.files[i];
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }
    for (let j = 0; j < this.files.length; j++) {
      let data = new FormData();
      let fileItem = this.files[j];
      // console.log(fileItem.name);
      data.append('file', fileItem);
      this.uploadFile(data);
      // this.onRemove(this.files[j])
    }
    // this.files = [];
  }

}
