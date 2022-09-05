import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Md5} from 'ts-md5/dist/md5';
import { ImageGettingService } from '../../get-img-url.service';
import { Resource } from '../../items.service';
import { DataGetterService } from '../../data-getting.service';
import { AllItemsService } from '../../all-items.service';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class ResTableComponent implements OnInit {
  elmass:Resource[] = []
  cutedMass:Resource[] = []
  pvSearch:string = ""
  constructor(private data: DataGetterService, private items: AllItemsService, private search:SearchService) {}

  ngOnInit(): void {
    this.elmass = []
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
    this.elmass = await this.items.GetAllResources()
    this.cutedMass = this.elmass
  }
  async Search(st:any, type:string = "") {
    this.pvSearch = st;
    if (type == "new") {
      this.search.Find(this.elmass, st).then(val => this.SetMass(val));
      return;
    }
    this.search.Find(this.cutedMass, st).then(val => this.SetMass(val));
    return;
  }

  // Send string to search
  keyPressNumbers(event:any) {
    let full = event.target.value.toLocaleLowerCase();
    let chan = event.data;
    if (full.length == 0) {
      this.pvSearch = "";
      this.cutedMass = this.elmass;
      return;
    }
    if (chan == null || full.length < this.pvSearch.length) {
      this.Search(full, "new");
      return;
    }
    this.Search(full);
    return;
  }
  SetMass(val:Resource[]) {
    this.cutedMass = val;
  }
}
