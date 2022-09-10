import { Component, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AllItemsService } from 'src/app/sections/all-items.service';
import { ItemDisplayService } from 'src/app/sections/item-display.service';
import { Component as Comp, Resource } from 'src/app/sections/items.service';
import { FullResPlusNum } from './craft-Item-classes';

@Component({
  selector: 'app-craft-item',
  templateUrl: './craft-item.component.html',
  styleUrls: ['./craft-item.component.scss']
})
export class CraftItemComponent implements OnInit {
  @Input()
  item: Comp = new Comp();
  // Variables for pop up
  // variables for displaing items
  @ViewChild('itemsContainer', { read: ViewContainerRef }) container: ViewContainerRef | undefined;
  @ViewChild('ite', { read: TemplateRef }) template: TemplateRef<any> | undefined;
  @ViewChild('popBox', { static: false }) popBox:ElementRef | undefined;
  private timer:any;
  private myPopup:any;
  delay? = 1;
  constructor(private items:AllItemsService, private renderer:Renderer2) { }
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
    if (ress == undefined) alert(`Final+ ${this.item.name}`);
    this.item.FullRes = ress;
  }
  async GetFullItem(name:string) {
    let res: Resource|undefined = new Resource();
    let allIte = await this.items.GetAllItems();
    res = allIte.find(ite => ite.name == name);
    return res;
  }
  //Pop up
  // Display popup with planet where you can find resource current hover and main
  DisplayRes(curr:string, targ:MouseEvent) {
    this.timer = setTimeout(() => {
      let x = targ.clientX;
      let y = targ.clientY;
      this.CreateResPopup(curr, x, y);
    }, this.delay)
  }
  // Create Popup with planet
  CreateResPopup(curr:string, x:number, y:number) {
    if (this.myPopup) this.ClearPopUp();
    const cont = {
      item: this.item.FullRes?.find(val => val.res.name == curr)?.res
    };
    this.container!.createEmbeddedView(this.template!, cont);
    //let crItem = this.renderer.createElement("app-craft-item");
    //this.renderer.setProperty(crItem, "item", this.item.FullRes?.find(val => val.res.name = curr)?.res);
    //this.renderer.addClass(crItem, "popUp");
    //this.renderer.appendChild(this.popBox?.nativeElement, crItem);
    //let popup = document.createElement('div');
    //popup.inne  rHTML = `<app-craft-item [item] ="${this.item.FullRes?.find(val => val.res.name = curr)?.res}"></app-craft-item>`;
    //popup.setAttribute("class", "tooltip-container");
    //popup.style.top = (y-20).toString() + "px";
    //popup.style.left = (x+90).toString() + "px";
    //document.body.appendChild(popup);
    //this.myPopup = popup;
    //this.timer = setTimeout(() => {
    //  if (this.myPopup) this.ClearPopUp()
    //}, 500000); // Remove tooltip after 5 seconds
  }
  // Clear popup
  ClearPopUp() {
    //if (this.timer) clearTimeout(this.timer);
    //this.myPopup.remove();
    this.container?.clear();
  }
}
