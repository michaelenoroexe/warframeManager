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
  del:boolean = false;
  delPass:string = "";
  ex:boolean = false;
  oldPass:string = "";
  newPass:string = "";
  constructor(public userInf:UserInfoStorageService,private router:Router,private ch:UserInfoChangeService) {
    userInf.GetUserInf().then(val => {
      if (val.anonymous) {
        this.router.navigate(['/login'], { replaceUrl: true });
        return;
      }
      this.UserInfo = val;
    }).catch(err => {
      this.router.navigate(['/login'], { replaceUrl: true });
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
    this.Save();
  }
  Save() {
    this.ch.ProfileInfoChange({Image:this.UserInfo!.userImage, 
      Rank:this.UserInfo!.userRank}).subscribe({
        next(value) {
        },
    });
  }
  PassCh() {
    this.ch.UserPasswordChange({OldPass:this.oldPass, NewPass:this.newPass})
      .subscribe({
        next(val) {}
      })
  }
  LogOut() {
    localStorage.removeItem('accessToken');
    let ta = () => {
      location.href ='./arsenal/crafting';
    }
    ta();
  }
  DelAcc() {
    this.ch.UserDelete({Pas:this.delPass}).subscribe({
      next(value) {
        localStorage.removeItem('accessToken');
        let ta = () => {
          location.href ='./arsenal/crafting';
        }
        ta();
      },
    })
  }
  ngOnInit(): void {
  }

}
