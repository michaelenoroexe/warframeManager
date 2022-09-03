import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  async Find(list:Array<any>, str:string) {
    return list.filter(ite => ite.name.toLocaleLowerCase().includes(str))
  }
}
