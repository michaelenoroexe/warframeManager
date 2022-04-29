import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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
    this.http.get("https://localhost:7132/weatherforecast/test", {
      headers: {
        "Authorization": "Bearer " + tok
      }
    }).subscribe((val)=>console.log(val)); 
  }
}
