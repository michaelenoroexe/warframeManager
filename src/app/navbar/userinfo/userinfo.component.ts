import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataGetterService } from 'src/app/sections/data-getting.service';
import { NumFieldChangeService } from 'src/app/sections/num-field-change.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {
  nickName:String = "Mishael5253";
  rank:String = "Silver sage";
  credits:number = 0;
  constructor(public ch:NumFieldChangeService, private ge:DataGetterService) { 
  }

  ngOnInit(): void {
    let th = this;
    this.ge.GetCredits().subscribe({
      next(value) {th.credits = value as number},
      error(err) {th.credits = 0},
    })
  }
}
