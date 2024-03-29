import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Md5} from 'ts-md5/dist/md5';
import { ImageGettingService } from '../../get-img-url.service';
import { Resource } from '../../items.service';
import { DataGetterService } from '../../data-getting.service';
import { AllItemsService } from '../../all-items.service';
import { SearchPar, SearchService } from '../../search.service';
import { CansToc, ItemDisplayService } from '../../item-display.service';
import { NumFieldChangeService } from '../../num-field-change.service';
import { SecSetService } from 'src/app/navbar/menu/sec-ch.service';

@Component({
  selector: 'app-arstable',
  templateUrl: './arstable.component.html',
  styleUrls: ['./arstable.component.scss', '../../../sections/search.scss']
})
export class ArsTableComponent implements OnInit {
  // variables for displaing items
  @ViewChild('itemsContainer', { read: ViewContainerRef }) container: ViewContainerRef | undefined;
  @ViewChild('item', { read: TemplateRef }) template: TemplateRef<any> | undefined;
  elmass:Resource[] = []
  cutedMass:Resource[] = []
  pvSearch:string = ""
  displayCansToc:CansToc = new CansToc();
  currPar:SearchPar = new SearchPar();
  addPar:boolean = false;
  currCateg:string = "all";
  constructor(private set:SecSetService, public ch:NumFieldChangeService, private display: ItemDisplayService, private items: AllItemsService, private search:SearchService) {}

  ngOnInit(): void {
    this.set.sec.section = "arsenal";
    this.set.sec.sel = "arstable";
    this.elmass = []
    this.GetItems()
  }
  async GetItems() {
    this.elmass = await this.items.GetAllItems();
    this.cutedMass = this.elmass;
    this.display.buildData(this.cutedMass, this.container!, this.template!);
  }
  
  async CategSea(na:string = "", or:string[] = [], all:string[] = []) {
    this.currPar.categ = na;
    this.currPar.or = or;
    this.currPar.and = all;
    this.SetMass(await this.search.Search("new", this.currPar, this.elmass));
  }
  // Send string to search
  keyPressNumbers(event:any) {
    let full = event.target.value.toLocaleLowerCase();
    let chan = event.data;
    if (chan == null || full.length < this.pvSearch.length) {
      this.currPar.str = full;
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
    if (par == "rtb")// Ready to build
      this.currPar.readyToBuild = res;
    if (par == "own")// Owned
    this.currPar.own = res;
    if (par == "mast")// Masterable
    this.currPar.masterable = res;

    this.search.Search("new", this.currPar, this.elmass as Resource[]).then((val: Resource[]) => this.SetMass(val));
  }
}
