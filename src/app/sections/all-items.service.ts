
import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { Md5 } from 'ts-md5';
import { DataGetterService } from './data-getting.service';
import { ImageGettingService } from './get-img-url.service';
import { Component, Resource } from './items.service';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class AllItemsService {
  _itemBuffer:Resource[] | Component[] = []
  _resourceBuffer:Resource[] = []
  Restas:Promise<Object>
  Itetas:Promise<Object>
  Types:{ id:Object, name:string, strId: string; }[] = [];
  private resbufferRedy:boolean = false
  private itembufferRedy:boolean = false
  public get ItemBuffer() {
    return this._itemBuffer
  }
  constructor(private find:SearchService, private gett:DataGetterService) {
    let th = this
    this.Itetas = firstValueFrom(gett.GetAllComponents())
    this.Itetas.
      then(re => {
        this._itemBuffer = Component.castArray(Object.values(re))
        this.LoadAllItemsImages(this._itemBuffer, ImageGettingService.GetItemImgUrl);
        this.GetAllTypes(this._itemBuffer);
        this.find.Sort(this._itemBuffer);
        this.itembufferRedy = true;
      });
    this.Restas = firstValueFrom(gett.GetAllRess())
    this.Restas.
      then(re => {
        this._resourceBuffer = Component.castArray(Object.values(re))
        this.LoadAllItemsImages(this._resourceBuffer, ImageGettingService.GetResImgUrl);
        this.GetAllTypes(this._resourceBuffer);
        this.resbufferRedy = true;
      });
    //this.GetAllItems()
    //this.GetAllResources()
    
  }
  async GetAllItems() {
    if (this.itembufferRedy == false)
      await this.Itetas;
    return this._itemBuffer
  }

  async GetAllResources() {
    if (this.resbufferRedy == false) 
      await this.Restas
    return this._resourceBuffer
  }

  async GetAllTypes(an:any) {
    let re = await firstValueFrom(this.gett.GetAllTypes());
    Object.values(re).forEach(r => this.Types.push(r));
    let th = this;
    let ty: any[] = [];
    an.forEach((res: { type: string[]; }) => {
      ty = [];
      res.type.forEach(typ => { 
        ty.push(this.Types.find(x => x.strId == typ)?.name)
      })
      res.type = ty;
    })
  }

  async LoadAllItemsImages(ar:Array<any>, imgGet:Function) {
    ar.forEach(
      item => {
        try {
          let splitStr = item.name.toLowerCase().split(' ');
          for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
          }
          // Directly return the joined string
          let resName = splitStr.join('');
          resName = imgGet(resName);
          let hash = Md5.hashStr(resName+'.png');
          let patturl = `https://static.wikia.nocookie.net/warframe/images/${hash[0]}/${hash[0]+hash[1]}/${resName}.png`;
          item.img = patturl;
        }
        catch (ar) {
          alert(ar)
        }
      })
  }
}