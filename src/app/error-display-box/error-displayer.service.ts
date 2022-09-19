import { ViewContainerRef, TemplateRef, Injectable, EmbeddedViewRef } from "@angular/core";
import { Observable } from "rxjs";

@Injectable ({
  providedIn : 'root'
})
export class ErrorDisplayerService {

  container:ViewContainerRef | undefined;
  template:TemplateRef<any> | undefined;
  constructor() { }

  DisplayFromProm(prom:Promise<any>) {
    const th = this;
    prom.catch(err => {
        if (th.container != undefined && th.template != undefined) {
          const context = { text: "Error"};
          th.container?.clear();
          th.container.createEmbeddedView(th.template, context);
        }
    });
  }
  DisplayFromObs(prom:Observable<any>) {
    let th = this;
    prom.subscribe({
      error(err) {
        if (th.container != undefined && th.template != undefined) {
          const context = { text: "Error"};
          th.container!.clear();
          th.container.createEmbeddedView(th.template, context);
        }
      }
    })
  }
  DisplayWithParam() {
    if (this.container != undefined && this.template != undefined) {
      const context = { text: "Error"};
      this.container!.clear();
      this.container.createEmbeddedView(this.template, context);
    }
  }
  //const context = {
  //  item: mass[n]
  //};
  //container.createEmbeddedView(temp, context);
}
