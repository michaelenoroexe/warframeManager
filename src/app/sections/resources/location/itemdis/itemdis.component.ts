import { Component, OnInit } from '@angular/core';
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
  constructor(private route: ActivatedRoute, private planets: PlanetService) { }

  ngOnInit(): void {
    this.planets.GetPlanetBuffer().then(val => {this.plan = val; this.DisplayItemInfo()})
  }
  // Get all info about resource in parameter
  async DisplayItemInfo(nam = "") {
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

  ngOnDestroy() {}
}
