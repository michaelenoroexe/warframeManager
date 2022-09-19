import { Component, Input, OnInit } from '@angular/core';
import { startWith } from 'rxjs';
import { ErrorDisplayerService } from './error-displayer.service';

@Component({
  selector: 'app-error-display-box',
  templateUrl: './error-display-box.component.html',
  styleUrls: ['./error-display-box.component.scss']
})
export class ErrorDisplayBoxComponent implements OnInit {

  @Input()
  err:any;

  errName:string = "";
  errInfo:string = "";

  constructor(private errBox:ErrorDisplayerService) {}

  ngOnInit(): void {
    this.DefineError();
  }

  DefineError() {
    if (this.err.message.startsWith("Http failure response for") && 
      this.err.message.endsWith("0 Unknown Error")) {
      this.errName = "Error to access server";
      this.errInfo = "Server is not reachable try again next time";
    }
  }
  Del() {
    this.errBox.Clear();
  }
}
