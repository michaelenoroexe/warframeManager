import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Md5} from 'ts-md5/dist/md5';
import { ImageGettingService } from '../../get-img-url.service';
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
    this.GetItems()
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
}
