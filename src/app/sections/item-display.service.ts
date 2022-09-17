import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Resource } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class ItemDisplayService {
  interval:any;
// Progressive display of elements 
public buildData(mass:Resource[], container:ViewContainerRef, temp:TemplateRef<any>) {
  clearInterval(this.interval);
  container.clear();
  const ITEMS_RENDERED_AT_ONCE = 30;
  const INTERVAL_IN_MS = 10;

  let currentIndex = 0;

  this.interval = setInterval(() => {
    const nextIndex = currentIndex + ITEMS_RENDERED_AT_ONCE;

    for (let n = currentIndex; n <= nextIndex ; n++) {
      if (n >= mass.length) {
        clearInterval(this.interval);
        break;
      }
      const context = {
        item: mass[n]
      };
      container.createEmbeddedView(temp, context);
    }

    currentIndex += ITEMS_RENDERED_AT_ONCE+1;
  }, INTERVAL_IN_MS);
}
  constructor() { }
}
export class CansToc {
  close:boolean = false;
  working:boolean = false;
}
