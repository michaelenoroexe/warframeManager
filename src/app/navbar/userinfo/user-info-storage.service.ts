import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataGetterService } from 'src/app/sections/data-getting.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoStorageService {
  us:UserInfoStorage = new UserInfoStorage();
  private ready:boolean = false;
  private task:Promise<any> | null;
  constructor(private ge:DataGetterService) {
    let th = this;
    let re = this.ge.GetUserInfo()
    if (re != null)
    this.task = firstValueFrom(re);
    else this.task = null;
  }

  async GetUserInf() {
    if (this.ready == false) {
      let re = await this.task;
      if (re != undefined) {
        this.us.GetDataFromRes(re);
      }
      this.ready = true;
    }
    return this.us;
  }

}
export class UserInfoStorage {
  userLogin:string = "Username";
  private _userImage:number = 0;
  public get userImage():number {
    return this._userImage;
  }
  public set userImage(val:number) {
    this._userImage = val;
  }
  private _userRank:number = 0;
  public get userRank():number {
    return this._userRank;
  }
  public set userRank(val:number) {
    this._userRank = val;
  }
  private _anonymous:boolean = true;
  public get anonymous():boolean {
    return this._anonymous;
  }

  imgList:string[] = Array.from({length: 16}, (_, i) => ""+(i + 1))
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


  public GetDataFromRes(it:any) {
    this.userLogin = it.login;
    this._userRank = it.rank;
    this._userImage = it.image;
    this._anonymous = false;
  }
}
