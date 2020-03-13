import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bead',
  templateUrl: './view-bead.component.html',
  styleUrls: ['./view-bead.component.scss']
})
export class ViewBeadComponent implements OnInit {
  htmlContent: any;
  editorFlag = false;
  email:any = {};
  constructor(public route: Router) {
    // var previousPageData = this.route.getCurrentNavigation();
    var data = {
      _id: "5e6bc4a4b2d93f088405c0d6",
      TO: "flemingparmar7895@gmail.com",
      FROM: "sahilparmar1810@gmail.com",
      SUBJECT: "Testing Mail",
      MESSAGE: "Hello, Im doing testing for it ",
      STATUS: true,
      ISREAD: false,
      CREATED_DATE: "2020-03-13T17:36:36.701Z"
    };
    this.email = data;
  }

  ngOnInit() {
    this.htmlContent = 'Hello there,  <br/> <p>The toolbar can be customized and it also supports various callbacks such as <code>oninit</code>, <code>onfocus</code>, <code>onpaste</code> and many more.</p> <p>Please try <b>paste some texts</b> here</p>';

  }

  editorOpen() {
    this.editorFlag = true;
  }
  editorClose() {
    this.editorFlag = false;
  }

}
