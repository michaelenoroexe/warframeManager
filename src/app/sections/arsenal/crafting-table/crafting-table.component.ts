import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { SecSetService } from 'src/app/navbar/menu/sec-ch.service';
import { AllItemsService } from '../../all-items.service';
import { CansToc, ItemDisplayService } from '../../item-display.service';
import { Resource, Component as Comp } from '../../items.service';
import { SearchPar, SearchService } from '../../search.service';

@Component({
  selector: 'app-crafting-table',
  templateUrl: './crafting-table.component.html',
  styleUrls: ['./crafting-table.component.scss', '../../../sections/search.scss' ]
})
export class CraftingTableComponent implements OnInit {
  
  // variables for displaing items
  @ViewChild('itemsContainer', { read: ViewContainerRef }) container: ViewContainerRef | undefined;
  @ViewChild('item', { read: TemplateRef }) template: TemplateRef<any> | undefined;
  elmass:any[] = []
  cutedMass:Comp[] | Resource[] = []
  pvSearch:string = ""
  displayCansToc:CansToc = new CansToc();
  currPar:SearchPar = new SearchPar();
  addPar:boolean = false;
  currCateg:string = "all";
  constructor(private set:SecSetService, private display: ItemDisplayService, private items: AllItemsService, private search:SearchService) {}

  ngOnInit(): void {
    this.set.sec.section = "arsenal";
    this.set.sec.sel = "crafting";
    this.elmass = []
    this.GetItems()
  }
  async GetItems() {
    this.elmass = await this.items.GetAllItems();
    this.elmass = this.GetCraftable(this.elmass);
    this.cutedMass = this.elmass;
    this.display.buildData(this.cutedMass as Resource[], this.container!, this.template!);
  }
  GetCraftable(full:any[]) {
    let res: Comp[] = []
    full.forEach(val =>{
      if (val.neededResources != undefined) res.push(val as Comp)
    })
    return res;
  }
  async CategSea(na:string = "", or:string[] = [], all:string[] = [], notOr:boolean = false) {
    this.currPar.categ = na;
    this.currPar.or = or;
    this.currPar.and = all;
    this.currPar.notOr = notOr;
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
    this.search.Search("", this.currPar, this.cutedMass as Resource[]).then((val: Resource[]) => this.SetMass(val));
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
