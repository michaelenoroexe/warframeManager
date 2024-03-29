import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Md5} from 'ts-md5/dist/md5';
import { ImageGettingService } from '../../get-img-url.service';
import { Resource } from '../../items.service';
import { DataGetterService } from '../../data-getting.service';
import { AllItemsService } from '../../all-items.service';
import { SearchPar, SearchService } from '../../search.service';
import { ItemDisplayService } from '../../item-display.service';
import { SecSetService } from 'src/app/navbar/menu/sec-ch.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss', '../../../sections/search.scss']
})
export class ResTableComponent implements OnInit {
  // variables for displaing items
  @ViewChild('itemsContainer', { read: ViewContainerRef }) container: ViewContainerRef | undefined;
  @ViewChild('item', { read: TemplateRef }) template: TemplateRef<any> | undefined;
  elmass:Resource[] = [];
  cutedMass:Resource[] = [];
  pvSearch:string = "";
  currPar:SearchPar = new SearchPar();
  addPar:boolean = false;
  currCateg:string = "all";
  constructor(private set:SecSetService, private display:ItemDisplayService , private items: AllItemsService, private search:SearchService) {}

  ngOnInit(): void {
    this.set.sec.section = "resources";
    this.set.sec.sel = "table";
    this.elmass = []
    this.GetItems()
  }
  async GetItems() {
    this.elmass = await this.items.GetAllResources()
    this.cutedMass = this.elmass
    this.display.buildData(this.cutedMass, this.container!, this.template!);
  }
  CategSea(na:string = "", or:string[] = [], all:string[] = []) {
    this.currPar.categ = na;
    this.currPar.or = or;
    this.currPar.and = all;
    this.search.Search("new", this.currPar, this.elmass).then(val => this.SetMass(val));
  }
  // Send string to search
  keyPressNumbers(event:any) {
    let full = event.target.value.toLocaleLowerCase();
    let chan = event.data;
    if (chan == null || full.length < this.pvSearch.length) {
      this.currPar.str = full
      this.pvSearch = this.currPar.str;
      this.search.Search("new", this.currPar, this.elmass).then((val: Resource[]) => this.SetMass(val));
      return;
    }
    this.currPar.str = full
    this.pvSearch = this.currPar.str;
    this.search.Search("", this.currPar, this.cutedMass).then((val: Resource[]) => this.SetMass(val));
    return;
  }
  SetMass(val:Resource[]) {
    this.cutedMass = val;
    this.display.buildData(this.cutedMass, this.container!, this.template!);
  }
  Display(par:string, res:any) {
    if (par == "own")// Owned
      this.currPar.own = res;
    this.search.Search("new", this.currPar, this.elmass as Resource[]).then((val: Resource[]) => this.SetMass(val));
  }
}
