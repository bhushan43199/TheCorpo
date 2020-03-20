import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/services';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { FileUploader } from 'ng2-file-upload';
import { appConfig } from 'app/app.config';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss',
    '../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  public uploadfile: FileUploader;

  public toggleButton: boolean = true;
  public imgURL;
  loading: any;
  // bsValue: Date = new Date();
  user: any = {};

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  constructor(private _user_service: UserService,
    private toasterService: ToasterService,
    private sanitizer: DomSanitizer,public spinnerService:Ng4LoadingSpinnerService,
    private http: HttpClient) {
    this.imgURL = "assets/img/avatars/8.jpg";

  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"))
    this.imgURL = this.user.LOGO;
    if(this.imgURL == '' || this.imgURL == undefined){
      this.imgURL = "assets/img/avatars/8.jpg"
    }
    this.user.DOB = new Date();
  }

  uploadFile(data: FormData, item) {
    var userId = item._id;
    this.http.post(appConfig.apiUrl + '/user/profilePic/' + userId, data, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("success")
        } else if (event instanceof HttpResponse) {
          this.setData(event.body)
        }
      });
  }
  setData(updatedUser) {
    this.user = updatedUser.data;
    localStorage.setItem('user', JSON.stringify(this.user));
    console.log("set Data", this.user)
  }
  uploadSubmit(profile) {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      // console.log(fileItem.name);
      data.append('file', fileItem);
      this.uploadFile(data, profile);
    }
    this.uploader.clearQueue();
  }
  enable() {
    this.toggleButton = false;
  }

  disable() {
    this.toggleButton = true;
  }

  onAdd(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgURL = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  updateProfile() {
    this.spinnerService.show();
    this.loading = true;
    this._user_service.updateProfile(this.user)
      .subscribe(
        data => {
          if (data.verify == '1') {
            this.spinnerService.hide();
            localStorage.setItem('user', JSON.stringify(data.data));
            this.toasterService.pop('success', 'Done', 'User Updated');
            this.uploadSubmit(data.data);
          } else {
            this.spinnerService.hide()
            this.toasterService.pop('error', 'ooops..', 'Something went wrong !')
          }
        },
        error => {
          this.spinnerService.hide()
          this.toasterService.pop('error', 'Server Error', 'Something went wrong !')
          this.loading = false;
        });
  }

}
