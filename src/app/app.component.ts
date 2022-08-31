import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import { AllItemsService } from './sections/all-items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'warframeManager';

  constructor(private http: HttpClient, public items:AllItemsService) {}
  // Test request for checking performance of jwt tokens 
  testReq(){
    let tok = localStorage.getItem("accessToken");
    console.log(tok);
    this.http.get(environment.apiURL+"weatherforecast/test", {
      headers: {
        "Authorization": "Bearer " + tok
      }
    }).subscribe((val)=>console.log(val)); 
  }
}
