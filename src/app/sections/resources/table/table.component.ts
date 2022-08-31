import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Md5} from 'ts-md5/dist/md5';
import { ImageGettingService } from '../get-img-url.service';
import { Resource } from '../../items.service';
import { DataGetterService } from '../../data-getting.service';
import { AllItemsService } from '../../all-items.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class ResTableComponent implements OnInit {
  elmass:Resource[] = []
  constructor(private data: DataGetterService, private items: AllItemsService) {}

  ngOnInit(): void {
    const md5 = new Md5();
    var resListGet = this.data.GetAllRess();
    var resList: any
    this.elmass = []
    var cuur = this
    this.GetItems().finally(() => this.DisplayAllItems())
    //resListGet.subscribe({
    //  next(res) {
    //    resList = res
    //    resList.forEach(
    //      (item: Resource) => {
    //        cuur.elmass.push(new Resource().cast(item))
    //      })
    //    cuur.DisplayAllItems()
    //  },
    //  error(err) {
    //    alert(err.message)
    //  },
    //  complete() {
    //  }
    //})
    
  }
  async GetItems() {
    this.elmass = await this.items.GetAllItems()
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
        resName = ImageGettingService.GetImgUrl(resName);
        let hash = Md5.hashStr(resName+'.png');
        let patturl = `https://static.wikia.nocookie.net/warframe/images/${hash[0]}/${hash[0]+hash[1]}/${resName}.png`;
        item.img = patturl;
      })
  }
}
