import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Md5} from 'ts-md5/dist/md5';
import { ImageGettingService } from '../../get-img-url.service';
import { Resource } from '../../items.service';
import { DataGetterService } from '../../data-getting.service';
import { AllItemsService } from '../../all-items.service';
import { SearchPar, SearchService } from '../../search.service';

@Component({
  selector: 'app-arstable',
  templateUrl: './arstable.component.html',
  styleUrls: ['./arstable.component.scss']
})
export class ArsTableComponent implements OnInit {
  elmass:Resource[] = []
  cutedMass:Resource[] = []
  pvSearch:string = ""
  currPar:SearchPar = {str:"", categ:"", or:[], and:[]};
  constructor(private data: DataGetterService, private items: AllItemsService, private search:SearchService) {}

  ngOnInit(): void {
    this.elmass = []
    this.GetItems()
    
  }
  async GetItems() {
    this.elmass = await this.items.GetAllItems()
    this.cutedMass = this.elmass
  }
  async Search(type:string = "") {
    this.pvSearch = this.currPar.str;
    if (type == "new") {
      this.search.Find(this.elmass, this.currPar).then(val => this.SetMass(val));
      return;
    }
    this.search.Find(this.cutedMass, new SearchPar(this.currPar.str)).then(val => this.SetMass(val));
    return;
  }
  CategSea(na:string = "", or:string[] = [], all:string[] = []) {
    this.currPar.categ = na;
    this.currPar.or = or;
    this.currPar.and = all;
    this.search.Find(this.elmass, this.currPar).then(val => this.SetMass(val));
  }
  // Send string to search
  keyPressNumbers(event:any) {
    let full = event.target.value.toLocaleLowerCase();
    let chan = event.data;
    if (chan == null || full.length < this.pvSearch.length) {
      this.currPar.str = full
      this.Search("new");
      return;
    }
    this.currPar.str = full
    this.Search();
    return;
  }
  SetMass(val:Resource[]) {
    this.cutedMass = val;
  }
}
