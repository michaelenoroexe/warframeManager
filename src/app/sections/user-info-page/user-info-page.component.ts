import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoStorage, UserInfoStorageService } from 'src/app/navbar/userinfo/user-info-storage.service';
import { DataGetterService } from '../data-getting.service';
import { ImageGettingService as img } from '../get-img-url.service';
import { UserInfoChangeService } from './user-info-change.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss']
})
export class UserInfoPageComponent implements OnInit {

  UserInfo:UserInfoStorage | undefined;
  constructor(public userInf:UserInfoStorageService,private router:Router,private ch:UserInfoChangeService) {
    userInf.GetUserInf().then(val => {
      if (val.anonymous) {
        this.router.navigate(['/login']);
        return;
      }
      this.UserInfo = val;
    }).catch(err => {
      this.router.navigate(['/login']);
    })
  }
  GetRankImg(name:string) {
    return img.GetRankImgUrl(name);
  }
  SelectProfImg(num:number) {
    this.UserInfo!.userImage = num;
    this.Save();
  }
  SelectRank(num:number) {
    this.UserInfo!.userRank = num;
    this.Save()
  }
  Save() {
    this.ch.ProfileInfoChange({Image:this.UserInfo!.userImage, 
      Rank:this.UserInfo!.userRank}).subscribe({
        next(value) {
        },
    });
  }
  ngOnInit(): void {
  }

}
