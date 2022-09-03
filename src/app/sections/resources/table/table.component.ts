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
  constructor(private data: DataGetterService, private items: AllItemsService, private search:SearchService) {}

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
    this.cutedMass = this.elmass
  }
  async Search(st:any, type:string = "") {
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
    if (chan == null) {
      this.Search(full, "new");
      return;
    }
    this.Search(full)
    return;
  }
  SetMass(val:Resource[]) {
    this.cutedMass = val;
  }
}
