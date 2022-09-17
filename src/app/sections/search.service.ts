import { Injectable } from '@angular/core';
import { Resource } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  param:SearchPar = new SearchPar();
  async Search(type:string = "", par:SearchPar, mass:Resource[]) {
    this.param = par;
    if (type == "new") {
      return await this.Find(mass);
      
    }
    // Clear additional filters to find
    this.param = new SearchPar(this.param.str)
    return await this.Find(mass);
  }
  private Find(list:Resource[]) {
    let res:Resource[] = list

    if (this.param.str != null && this.param.str != "" )
    res = res.filter(ite => ite.name.toLocaleLowerCase().includes(this.param.str))
    // If needed some tags included in item (all)
    if (this.param.and != null && this.param.and.length > 0)
    res = res.filter(this.AND, this);
    if (this.param.categ != null && this.param.categ != "")
    res = res.filter(ite => ite.type.includes(this.param.categ));
    // If needed some tags included in item (any)
    if (this.param.or != null && this.param.or.length > 0)
    res = res.filter(this.OR, this);
    this.Sort(res);
    return res;
  }
  // Filter for res dont work with lambda, or check
  private OR(el:any, nu:any, ar:any) {
    let th = this;
    let arr;
    if (this.param.notOr) {
      arr = this.param.or.every(val => !el.type.includes(val));
    } 
    else {
      arr = this.param.or.find(val => {
        if (el.type.includes(val)) {
          return true;
        }
        return false;
      }) != undefined;
    }
    return arr;
  }
  // Filter for res dont work with lambda, and check
  private AND(el:any, nu:any, ar:any) {
    let th = this;
    let arr;
    arr = this.param.or.find(val => {
      if (el.type.includes(val)) {
        return true;
      }
      return false;
    });
    
    return arr != undefined && arr.length == this.param.or.length;
  }
  // Sort the list
  public Sort(list:Resource[]) {
    list.sort( (fr, sr) => (fr.name > sr.name)?1:-1)
  }
}
export class SearchPar {
  str:string = "";
  categ:string = ""; 
  or:string[] = []; 
  and:string[] = [];
  notOr:boolean = false;
  constructor(st:string="",categ="",or:string[]=[],and:string[]=[], notOr:boolean = false) {
    this.str = st;
    this.categ = categ;
    this.or = or;
    this.and = and;
    this.notOr = notOr;
  }
}

