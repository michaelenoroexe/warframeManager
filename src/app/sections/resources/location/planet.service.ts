import { Injectable} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Md5 } from 'ts-md5';
import { AllItemsService } from '../../all-items.service';
import { DataGetterService } from '../../data-getting.service';
import { ImageGettingService } from '../../get-img-url.service';
import { Resource } from '../../items.service';
import { Planet } from './planet-class';

@Injectable({
  providedIn: 'root'
})
export class PlanetService{
  planetBuffer:Planet[] = []
  ready:boolean = false
  tas:Promise<Object>
  constructor(private getter:DataGetterService, private items:AllItemsService) {
    this.tas = firstValueFrom(getter.GetPlanets());
    this.GetPlanetBuffer();
  }

  private async FormPlanets(plan:Object) {
    let ress = [];
    for (let index = 0; index < Object.keys(plan).length; index++) {
      const id = Object.keys(plan)[index];
      let name = Object.values(plan)[index];
      let img = "";
      let splitStr = name.toLowerCase().split(' ');
      let resLi: any[] = [];
      let task = this.GetPlanetResources(id, resLi);
      for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
      }
      // Directly return the joined string
      name = splitStr.join(' ');
      let PlanName = splitStr.join('_');
      img = ImageGettingService.GetPlanetImgUrl(PlanName);
      let hash = Md5.hashStr(img+'.png');
      img = `https://static.wikia.nocookie.net/warframe/images/${hash[0]}/${hash[0]+hash[1]}/${img}.png`;
      await task;
      ress.push(new Planet(id, name, img, resLi));
    }
    this.planetBuffer = ress
  }
  // Get all resources from total item buffer
  private async GetPlanetResources(id:string, li:Array<any>) {
    await (await this.items.GetAllResources()).forEach(it => {
      if ( it.location?.some(res => res == id))
        li.push(it);
    })
  }
  public async GetPlanetBuffer() {
    if (!this.ready) {
      const th = this;
      let ress = await th.tas;
      await th.FormPlanets(ress);
      th.ready = true;
    }
    return this.planetBuffer;
  }

}
