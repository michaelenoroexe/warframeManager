import { Resource } from "src/app/sections/items.service";

export class FullResPlusNum {
  num:number = 1;
  res:any;
  constructor(res:any, num:number) {
    this.res = res;
    this.num = num;
  }
}
