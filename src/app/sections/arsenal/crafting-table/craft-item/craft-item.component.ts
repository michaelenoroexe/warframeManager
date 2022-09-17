import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AllItemsService } from 'src/app/sections/all-items.service';
import { ItemDisplayService } from 'src/app/sections/item-display.service';
import { Component as Comp, Resource } from 'src/app/sections/items.service';
import { NumFieldChangeService } from 'src/app/sections/num-field-change.service';
import { TimeDeserialService } from '../../time-deserial.service';
import { FullResPlusNum } from './craft-Item-classes';

@Component({
  selector: 'app-craft-item',
  templateUrl: './craft-item.component.html',
  styleUrls: ['./craft-item.component.scss']
})
export class CraftItemComponent implements OnInit {
  @Input()
  item: Comp = new Comp();
  @Input()
  zpos:number = 0;
  @Input()
  full:boolean = true;
  // Variables for pop up
  currentResElement: any;
  // variables for displaing items
  @ViewChild('itemsContainer', { read: ViewContainerRef }) container: ViewContainerRef | undefined;
  @ViewChild('ite', { read: TemplateRef }) template: TemplateRef<any> | undefined;
  @ViewChild('popBox', { static: false }) popBox:ElementRef | undefined;
  ress:any[] = [];
  private myPopup:any;
  delay? = 1;
  constructor(public ch:NumFieldChangeService ,private items:AllItemsService, public time: TimeDeserialService) { }
  ngOnInit(): void {
    this.GetFullResources();
  }
  // Get ref to full resource/component
  async GetFullResources() {
    let res = this.item.neededResources;
    let ress: FullResPlusNum[] | undefined = [];
    if (res == undefined)
      alert(this.item.name)
    for (let re of Object.keys(res)) {
      await this.items.GetAllResources().then(async allRess => {
        //let neededRes
        let neededRes = allRess.find(ress => ress.name == re)
        if (neededRes == undefined) neededRes = await this.GetFullItem(re);
        ress!.push(new FullResPlusNum(neededRes!, +res[re]));
      })
    }
    this.item.FullRes = ress;
    this.GetFullResourcesList(this.item);
  }
  async GetFullItem(name:string) {
    let res: Resource|undefined = new Resource();
    let allIte = await this.items.GetAllItems();
    res = allIte.find(ite => ite.name == name);
    return res;
  }
  GetNum(name:string) {
    return this.item.neededResources[Object.keys(this.item.neededResources).find(val => val == name)!];
  }
  async GetFullResourcesList(resource:Comp) {
    for (let resou of resource.FullRes!) {
      if (resou.res.FullRes == undefined) {
        let havingRes = this.ress.findIndex(re => re.res == resou.res);
        if (havingRes != -1) {
          this.ress[havingRes].num = this.ress[havingRes].num + resou.num;
          continue;
        }
        this.ress.push({...resou});
        continue;
      }
      this.GetFullResourcesList(resou.res);
    }
  }
  //Pop up
  // Display popup with planet where you can find resource current hover and main
  DisplayRes(targ:any, curr:string,) {
    if (!this.myPopup)
    {
      this.currentResElement = targ.target;
      this.CreateResPopup(curr, targ.layerX-200, targ.layerY+5);
    }
  }
  // Create Popup with planet
  CreateResPopup(curr:string, x:number, y:number) {
    if (this.myPopup) this.ClearPopUp();
    const cont = {
      item: this.item.FullRes?.find(val => val.res.name == curr)?.res,
      x: x+"px",
      y: y+"px"
    };
    if (cont.item.FullRes != undefined) {
      this.container!.createEmbeddedView(this.template!, cont);
      let po = document.getElementsByClassName('popUp');
      this.myPopup = po[po.length-1];
    }
  }
  @HostListener('mouseover', ['$event'])
  OnSkillMouseOver(event:any) {
    if (this.myPopup) {
      let hoverComponent = event.target;
      let inside = false;
      do {
        if (this.myPopup) {
          if (hoverComponent === this.myPopup || hoverComponent === this.currentResElement) {
            inside = true;
          }
        }
        hoverComponent = hoverComponent.parentNode;
      } while (hoverComponent);
      if (inside) {
      } else {
        this.ClearPopUp();
      }
    }
  }
  // Clear popup
  ClearPopUp() {
    //if (this.timer) clearTimeout(this.timer);
    if (this.myPopup) {
      this.myPopup.remove();
      this.myPopup = undefined;
    }
    this.container?.clear();
  }
}
