
import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { DataGetterService } from './data-getting.service';
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
    }
    return this._itemBuffer
  }
    
}