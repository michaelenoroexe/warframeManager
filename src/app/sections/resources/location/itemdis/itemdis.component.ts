import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Resource } from 'src/app/sections/items.service';
import { Planet } from '../planet-class';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-itemdis',
  templateUrl: './itemdis.component.html',
  styleUrls: ['./itemdis.component.scss']
})
export class ItemdisComponent implements OnInit {

  item:Resource = new Resource();
  plan:Planet[] = [];
  targetPlanets:Planet[] = []
  targetRes:Resource[] =[]
  private myPopup:any;
  private timer:any;
  delay? = 1;
  constructor(private route: ActivatedRoute, private planets: PlanetService) { }

  ngOnInit(): void {
    this.planets.GetPlanetBuffer().then(val => {this.plan = val; this.DisplayItemInfo()})
  }
  // Get all info about resource in parameter
  async DisplayItemInfo(nam = "") {
    if (this.myPopup) this.ClearPopUp();
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
    if (this.myPopup) { this.myPopup.remove() }
  }
}
