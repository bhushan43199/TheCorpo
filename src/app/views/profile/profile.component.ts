import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public toggleButton: boolean = true;
  public imgURL ;
  constructor() { 
   this.imgURL ="assets/img/avatars/8.jpg";
  }

  ngOnInit() {
  }
  enable(){
    this.toggleButton = false;
 }

 disable(){
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

}
