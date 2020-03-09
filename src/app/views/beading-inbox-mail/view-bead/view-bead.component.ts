import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-bead',
  templateUrl: './view-bead.component.html',
  styleUrls: ['./view-bead.component.scss']
})
export class ViewBeadComponent implements OnInit {
  htmlContent:any;
  editorFlag =false;
  constructor() { }

  ngOnInit() {
    this.htmlContent= 'Hello there,  <br/> <p>The toolbar can be customized and it also supports various callbacks such as <code>oninit</code>, <code>onfocus</code>, <code>onpaste</code> and many more.</p> <p>Please try <b>paste some texts</b> here</p>';

  }

  editorOpen(){
    this.editorFlag= true;
  }
  editorClose(){
    this.editorFlag= false;
  }

}
