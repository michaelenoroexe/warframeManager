import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'warframeManager';

  constructor(private http: HttpClient) {}

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
