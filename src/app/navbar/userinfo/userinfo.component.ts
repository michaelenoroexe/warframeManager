import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataGetterService } from 'src/app/sections/data-getting.service';
import { NumFieldChangeService } from 'src/app/sections/num-field-change.service';
import { ImageGettingService as img } from '../../sections/get-img-url.service';
import { MenuComponent } from '../menu/menu.component';
import { SecSetService } from '../menu/sec-ch.service';
import { UserInfoStorage, UserInfoStorageService } from './user-info-storage.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {
  UserInfo:UserInfoStorage | undefined;
  nickName:String = "Username"
  rank:String = "Unranked"
  profPic:number = 0;
  credits:number = 0;
  constructor(private set:SecSetService, public ch:NumFieldChangeService, private ge:DataGetterService, public userInfStorage:UserInfoStorageService) { 
    let th = this;
    userInfStorage.GetUserInf().then(val => {
      th.UserInfo = val;
    });
  }

  ngOnInit(): void {
    let th = this;
    this.ge.GetCredits()?.subscribe({
      next(value) {
        th.credits = value as number
      },
      error(err) {th.credits = 0},
    })
  }
  GetRank() {
    if (this.UserInfo != undefined)
    return this.UserInfo!.ranksList[this.UserInfo!.userRank];
    return "Unranked";
  }
  GetImg() {
    if (this.UserInfo != undefined)
    return this.UserInfo!.userImage;
    return 0;
  }
  GetRankImg(name:string) {
    return img.GetRankImgUrl(name);
  }
  SetCurrSec() {
    this.set.sec.section = "";
    this.set.sec.sel = "account";
  }
}
