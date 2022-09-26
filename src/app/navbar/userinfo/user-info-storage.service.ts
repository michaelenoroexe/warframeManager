import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoStorageService {

  userLogin:string = "Username";
  userImage:number = 0;
  userRank:number = 0;
  anonymous:boolean = true;
  ranksList:string[] = [
    "Unranked",
    "Initiate",
    "Silver Initiate",
    "Gold Initiate",
    "Novice",
    "Silver Novice",
    "Gold Novice",
    "Disciple",
    "Silver Disciple",
    "Gold Disciple",
    "Seeker",
    "Silver Seeker",
    "Gold Seeker",
    "Hunter",
    "Silver Hunter",
    "Gold Hunter",
    "Eagle",
    "Silver Eagle",
    "Gold Eagle",
    "Tiger",
    "Silver Tiger",
    "Gold Tiger",
    "Dragon",
    "Silver Dragon",
    "Gold Dragon",
    "Sage",
    "Silver Sage",
    "Gold Sage",
    "Master",
    "Middle Master",
    "True Master",
    "Legendary 1",
    "Legendary 2",
    "Legendary 3"
  ];

  constructor() { }

  public GetDataFromRes(it:object) {

  }
}
