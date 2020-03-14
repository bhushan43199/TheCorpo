import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserService } from 'app/services';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: [ '../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  passwordType: string = 'password';
  passwordShown: boolean = false;
  eyeIcon : String ='fa fa-eye';
  passwordType2: string = 'password';
  passwordShown2: boolean = false;
  eyeIcon2 : String ='fa fa-eye';
  modalRef: BsModalRef;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  public data: any;
  public user: any = {};
  loading: any;
  userlist: any = [];
  public userRoles = [
    { label: "Venue Provider", value: 2 },
    { label: "User", value: 3 }
  ];
  public genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ]
  constructor(private modalService: BsModalService, private toasterService: ToasterService, private _user_service: UserService, public _router: Router) { }

  ngOnInit() {
    // this.getAllRegisterdUsers();
  }

  public togglePassword() {
    
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password'
      this.eyeIcon ="fa fa-eye"
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
      this.eyeIcon ="fa fa-eye-slash";
    }
  }

  public togglePassword2() {
    
    if (this.passwordShown2) {
      this.passwordShown2 = false;
      this.passwordType2 = 'password'
      this.eyeIcon2 ="fa fa-eye"
    } else {
      this.passwordShown2 = true;
      this.passwordType2 = 'text';
      this.eyeIcon2 ="fa fa-eye-slash";
    }
  }

  openAddUserModal() {
    this.user = {};
  }

  openEditUserModal(user) {
    this.user = user;
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  createUser() {
    this.loading = true;
    this._user_service.createUser(this.user)
      .subscribe(
        data => {
          if (data.verify == '1') {
            this.toasterService.pop('success', 'Done', 'Registration Done');
            this._router.navigate[('/pages/login')];
          } else {
            this.toasterService.pop('error', 'Oopps..', 'Something went wrong');
          }

        },
        error => {
          // this.showError(error.statusText);
          this.loading = false;
        });
  }

  // getAllRegisterdUsers() {
  //   this.loading = true;
  //   this._user_service.getAllRegisterdUsers()
  //     .subscribe(
  //       data => {
  //         if (data.verify == '1') {
  //           this.userlist = data.data;
  //         } else {
  //           this.toasterService.pop('error', 'ooops..', 'Something went wrong !')
  //         }

  //       },
  //       error => {
  //         this.toasterService.pop('error', 'Server Error', 'Something went wrong !')
  //         this.loading = false;
  //       });
  // }

  // openDataRestaurant(item, template: TemplateRef<any>) {
  //   this.user = item;
  //   this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  // }
  // confirm(): void {
  //   this.deleteUser(this.user);
  //   this.modalRef.hide();
  // }

  // decline(): void {
  //   this.modalRef.hide();
  // }
  // updateUser() {
  //   this.loading = true;
  //   this._user_service.updateUser(this.user)
  //     .subscribe(
  //       data => {
  //         if (data.verify == '1') {
  //           this.toasterService.pop('success', 'Done', 'User Updated');
  //           this.getAllRegisterdUsers();
  //         } else {
  //           this.toasterService.pop('error', 'ooops..', 'Something went wrong !')
  //         }
  //       },
  //       error => {
  //         this.toasterService.pop('error', 'Server Error', 'Something went wrong !')
  //         this.loading = false;
  //       });
  // }

  // deleteUser(user) {
  //   this.loading = true;
  //   this._user_service.deleteUser(user)
  //     .subscribe(
  //       data => {
  //         if (data.verify == '1') {
  //           this.toasterService.pop('success', 'Done', 'User Updated');
  //           this.getAllRegisterdUsers();
  //         } else {
  //           this.toasterService.pop('error', 'ooops..', 'Something went wrong !')
  //         }
  //       },
  //       error => {
  //         this.toasterService.pop('error', 'Server Error', 'Something went wrong !')
  //         this.loading = false;
  //       });
  // }

}
