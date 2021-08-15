import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Observable, observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;
  public words:[];
  @Output() public onUploadFinished = new EventEmitter();
  public responseSubscription = new Subscription;
  showCancelBtn: boolean;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    this.showCancelBtn = true;
    formData.append('file', fileToUpload, fileToUpload.name);
    this.responseSubscription = this.http.post('http://localhost:5000/api/WordCount', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.showCancelBtn = false;
        }

      });
  }

  public unsubscribeResponce (){
    this.responseSubscription.unsubscribe();
    this.message = 'Process Cancelled'
    this.progress = 0
    this.showCancelBtn = false;
   }

  public uploadFinished = (event) => {
    this.words = event;
  }

}
