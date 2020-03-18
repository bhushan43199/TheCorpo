import { Component, ElementRef } from '@angular/core';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
  
})
export class HomeComponent {

  constructor(private elementRef: ElementRef) { 

    // var s10 = document.createElement("script");
    // s10.type = "text/javascript";
    // s10.src = "assets/js/custom.js";
    // this.elementRef.nativeElement.appendChild(s10);
  }

}
