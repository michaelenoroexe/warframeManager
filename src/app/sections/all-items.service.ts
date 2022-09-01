
import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { Md5 } from 'ts-md5';
import { DataGetterService } from './data-getting.service';
import { ImageGettingService } from './get-img-url.service';
import { Component, Resource } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class AllItemsService {
  _itemBuffer:Resource[] | Component[] = []
  tas:Promise<Object>
  private bufferRedy:boolean = false
  public get ItemBuffer() {
    return this._itemBuffer
  }
  constructor(private gett:DataGetterService) {
    this.tas = firstValueFrom(gett.GetAllRess())
    this.GetAllItems()
    //this.tas = gett.GetAllRess().subscribe({
    //  next(value:any) {
    //    th._itemBuffer = Component.castArray(value)
    //  },
    //})
    
  }
  async GetAllItems() {
    if (this.bufferRedy == false) {
      let ress = await this.tas
      this._itemBuffer = Component.castArray(Object.values(ress))
      await this.LoadAllItemsImages()
      this.bufferRedy = true
    }
    return this._itemBuffer
  }
  async LoadAllItemsImages() {
    this.ItemBuffer.forEach(
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