import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beading-inbox-mail',
  templateUrl: './beading-inbox-mail.component.html',
  styleUrls: ['./beading-inbox-mail.component.scss']
})
export class BeadingInboxMailComponent implements OnInit {

  constructor(public route:Router) { }

  ngOnInit() {
  }

  viewBead(){
    this.route.navigate(['/view-bead']);
  }

}
