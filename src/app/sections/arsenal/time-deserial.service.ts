import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeDeserialService {

  constructor() { }
  public GetTimeString(num:number) {
    let sec = num;
    let min = Math.floor(sec /60);
    if (min >= 0 && min < 1) return `${sec} Seconds`;
    if (min == 1) return "1 Minute";
    let hour = Math.floor(min /60);
    if (hour >= 0 && hour < 1) return `${min} Minutes`;
    if (hour == 1) return "1 Hour";
    return `${hour} Hours`;
  }
}
