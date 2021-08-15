import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WordCountFrontend';
  public words:[];
  public showTable;


  
  public uploadFinished = (event) => {
    this.words = event;
    this.showTable = true;
  }

}
