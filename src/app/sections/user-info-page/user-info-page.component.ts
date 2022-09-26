import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoStorageService } from 'src/app/navbar/userinfo/user-info-storage.service';
import { DataGetterService } from '../data-getting.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss']
})
export class UserInfoPageComponent implements OnInit {

  constructor(private userInf:UserInfoStorageService,private router:Router, private getter:DataGetterService) { }

  ngOnInit(): void {
    let res = this.getter.GetUserInfo();
    if (this.userInf.anonymous) {
      this.router.navigate(['/login']);
      return;
    }
  }

}
