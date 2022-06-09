import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {
  nickName:String = "Mishael5253";
  rank:String = "Silver sage";
  credits:number = 42706462;
  platinum:number = 1001;
  constructor() { 
  }

  ngOnInit(): void {
  }
}
