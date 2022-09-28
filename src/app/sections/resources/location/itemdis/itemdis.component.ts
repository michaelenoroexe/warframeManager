import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Resource } from 'src/app/sections/items.service';
import { NumFieldChangeService } from 'src/app/sections/num-field-change.service';
import { Planet } from '../planet-class';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-itemdis',
  templateUrl: './itemdis.component.html',
  styleUrls: ['./itemdis.component.scss']
})
export class ItemdisComponent implements OnInit {
  @ViewChild('planetBox', { static: false }) d1:ElementRef | undefined;
  item:Resource = new Resource();
  plan:Planet[] = [];
  targetPlanets:Planet[] = [];
  targetRes:Resource[] =[]
  private myPopup:any;
  private timer:any;
  private planHeight = 100;
  private planWidth = 100;
  planetCords:{y:number, x:number}[] = [];
  planObj:any;
  delay? = 1;
  constructor(private router:Router, private route: ActivatedRoute, private planets: PlanetService, private renderer:Renderer2, public ch:NumFieldChangeService) { 
  //  this.router.routeReuseStrategy.shouldReuseRoute = function () {
  //    return false;
  //  };
  }

  ngOnInit(): void {
    this.planets.GetPlanetBuffer().then(val => {this.plan = val; this.DisplayItemInfo()})
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.planObj) this.renderer.removeChild(this.d1?.nativeElement, this.planObj);
    this.PlanDisplay();
  }
  PlanDisplay() {
    //objects variable
    let planetImg, planetPar, planetDiv;
    //clear prev objects
    this.planObj = this.renderer.createElement("div");
    this.GeneratePlanetsPosition();
    for(let ind = 0; ind < this.targetPlanets.length; ind++) {
      // Create planet object
      planetDiv = this.renderer.createElement("div");
      planetImg = this.renderer.createElement("img");
      planetPar = this.renderer.createElement("p");
      this.renderer.appendChild(planetPar,this.renderer.createText(this.targetPlanets[ind].name));
      this.renderer.addClass(planetPar, "par");
      this.renderer.setProperty(planetImg,"src", this.targetPlanets[ind].img);
      this.renderer.setStyle(planetImg, "width", `${this.planWidth}px`);
      this.renderer.setStyle(planetImg, "height", `${this.planHeight}px`);
      this.renderer.setStyle(planetImg, "object-fit", "contain");
      this.renderer.appendChild(planetDiv, planetPar);
      this.renderer.appendChild(planetDiv, planetImg);
      this.renderer.addClass(planetDiv, "planCont");
      this.renderer.setStyle(planetDiv, "left", `${this.planetCords[ind].x}px`);
      this.renderer.setStyle(planetDiv, "top", `${this.planetCords[ind].y}px`);
      this.renderer.appendChild(this.planObj, planetDiv);
      //this.renderer.appendChild(this.d1!.nativeElement, `<div class="planet" style = "${sty}"><p>${this.targetPlanets[ind].name}</p><img src = "${this.targetPlanets[ind].img}" style="${imgSty}"></div>`);
    }
    this.planHeight = 100;
    this.planWidth = 100;
    this.renderer.appendChild(this.d1?.nativeElement, this.planObj);
  }
  GeneratePlanetsPosition() {
    this.planetCords =[];
    // Container for planets
    let el = this.d1!.nativeElement;
    let planNum = this.targetPlanets.length;
    let ydif = (el.clientHeight-2*this.planHeight) / planNum;
    this.planetCords.push({y:this.Random(el.offsetTop,el.offsetTop+ydif/2),
                          x:this.Random(el.offsetLeft,el.clientWidth+el.offsetLeft-100)})
    let yst:number;
    let xst:number;
    for (let i = 1; i < planNum; i++ ) {
      yst = this.planetCords[i-1].y + this.Random(ydif/2,ydif*1.4)
      if (yst+ this.planHeight > el.clientHeight + el.offsetTop) yst -= yst + this.planHeight - el.clientHeight + el.offsetTop;
      xst = this.Random(el.offsetLeft,el.clientWidth+el.offsetLeft-100);
      // if planet locates full below prev - ok
      if (yst < this.planetCords[i-1].y+this.planHeight)
      // generate values while collision of planet touch each other
      while (this.FindCorForSomeFunc(xst, yst)){
        this.planWidth -= 1;
        this.planHeight -= 1;
        xst = this.Random(el.offsetLeft,el.clientWidth+el.offsetLeft-100);
      }
      
      this.planetCords.push({
        y:yst,
        x:xst
      })
    }
  }
  // Fucntion to find cross colisions of planets
  FindCorForSomeFunc(xpos:number, ypos:number) {
    return this.planetCords.find(cor => ypos-cor.y < this.planHeight && Math.abs(xpos-cor.x)<this.planWidth) != undefined;
  }
  // Get all info about resource in parameter
  async DisplayItemInfo(nam = "") {
    if (this.myPopup) this.ClearPopUp();
    // Destroy object with planets images when reroute to anouther resource
    if (this.planObj) this.renderer.removeChild(this.d1?.nativeElement, this.planObj);
    const resName = (nam == "")? (await firstValueFrom(this.route.params))['id']: nam;
    this.item = new Resource();
    this.targetPlanets = [];
    this.targetRes = [];
    for (let planInd = 0; planInd < this.plan.length; planInd++) {
      const singlePlanet = this.plan[planInd];
      for (let resInd = 0; resInd < singlePlanet.resources.length; resInd++) {
        if (singlePlanet.resources[resInd].name == resName) {
          if (this.item.id == "") this.item = singlePlanet.resources[resInd];
          this.targetPlanets.push(singlePlanet);
          singlePlanet.resources.forEach(planres => {
            if (planres.name != resName && 
                !this.targetRes.some(targ => targ.name == planres.name)) {
              this.targetRes.push(planres);
            }
          })
          break
        }
      }
    }
    this.PlanDisplay();
  }
  Random(min:number, max:number) {
    return Math.random() * (max - min) + min;
  }
  
  // Display popup with planet where you can find resource current hover and main
  DisplayPlanet(curr:string, targ:MouseEvent) {
    this.timer = setTimeout(() => {
      let x = targ.clientX;
      let y = targ.clientY;
      this.CreatePlanetPopup(curr, x, y);
    }, this.delay)
  }
  // Create Popup with planet
  CreatePlanetPopup(curr:string, x:number, y:number) {
    if (this.myPopup) this.ClearPopUp();
    let popup = document.createElement('div');
    let pl = this.GetPlanet(curr);
    popup.innerHTML = `<h2>${pl!.name}</h2> <img src = ${pl?.img} alt = "Planet"/>`;
    popup.setAttribute("class", "tooltip-container");
    popup.style.top = (y-20).toString() + "px";
    popup.style.left = (x+90).toString() + "px";
    document.body.appendChild(popup);
    this.myPopup = popup;
    this.timer = setTimeout(() => {
      if (this.myPopup) this.ClearPopUp()
    }, 5000); // Remove tooltip after 5 seconds
  }
  GetPlanet(curr:string) {
    return this.targetPlanets.find(sinPlan =>
      sinPlan.resources.some(re => re.name == curr)
    )
  }
  // Clear popup
  ClearPopUp() {
    if (this.timer) clearTimeout(this.timer);
    this.myPopup.remove();
  }
  ngOnDestroy() {
    //this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //  return true;
    //};
    if (this.myPopup) { this.myPopup.remove() }
    if (this.planObj) this.renderer.removeChild(this.d1?.nativeElement, this.planObj);
  }
}
