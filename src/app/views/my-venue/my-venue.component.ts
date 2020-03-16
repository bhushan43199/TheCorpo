import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-my-venue',
  templateUrl: './my-venue.component.html',
  styleUrls: ['./my-venue.component.scss']
})
export class MyVenueComponent implements OnInit {

  constructor(private elementRef: ElementRef) {
  }
  files: File[] = [];

	onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}
  ngOnInit() {
   
 

  }

}
