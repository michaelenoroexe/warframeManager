import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Md5} from 'ts-md5/dist/md5';
import { ImageGettingService } from '../get-img-url.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class ResTableComponent implements OnInit {
  elmass:Resource[] = [
    new Resource('echowinder', 100, false),
    new Resource('esher devar',200,false),
    new Resource('salvage', 35454500, false),
    new Resource('komms', 600, false),
    new Resource('seer barrel', 10, false),
    new Resource('tonkor', 1, true),
    new Resource('sedna nav segment', 10, false),
    new Resource('ganglion', 1050, false),
    new Resource('grokdrul', 1060, false),
    new Resource('arca plasmor', 1, true),
    new Resource('nano spores', 165400, false),
    new Resource('garuda chassis blueprint', 10, false),
    new Resource('dual toxocyst', 1, true),
    new Resource('lenz', 1, true),
    new Resource('dual toxocyst', 1, true),
    new Resource('lenz', 1, true),
    new Resource('garuda prime', 1, true),
    new Resource('garuda prime chassis blueprint', 10, false),
    new Resource('mesa', 1, true),
  ]
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const md5 = new Md5();
    var resListGet = this.http.get(environment.apiURL+"GetData/ResourcesList");
    var resList: any
    this.elmass = []
    var cuur = this
    resListGet.subscribe({
      next(res) {
        resList = res
        resList.forEach(
          (item: { name: string; mastery: boolean | undefined; }) => {
            cuur.elmass.push(new Resource(item.name, Math.floor(Math.random() * (1000 - 1 + 1) + 1), item.mastery))
          })
        cuur.DisplayAllItems()
      },
      error(err) {
        alert(err.message)
      },
      complete() {
      },
    })
    
  }
  DisplayAllItems() {
    this.elmass.forEach(
      item => {
        let splitStr = item.name.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
          // You do not need to check if i is larger than splitStr length, as your for does that for you
          // Assign it back to the array
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string
        let resName = splitStr.join('');
        resName = ImageGettingService.GetImgUrl(resName)
        let hash = Md5.hashStr(resName+'.png');
        let patturl = `https://static.wikia.nocookie.net/warframe/images/${hash[0]}/${hash[0]+hash[1]}/${resName}.png`;
        item.icon = patturl;
      })
  }
}
class Resource {
  constructor(name:string, owned:number, mastered:boolean = false, icon:string="") {
    this.icon = icon;
    this.name = name;
    this.owned = owned;
    this.mastered = mastered;
  }
  icon: string;
  name: string;
  owned: number;
  mastered: boolean;
}
