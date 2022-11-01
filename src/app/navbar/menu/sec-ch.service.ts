import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataGetterService } from 'src/app/sections/data-getting.service';

@Injectable({
  providedIn: 'root'
})
export class SecSetService {
  sec:Sect = new Sect;
  constructor() { }
}
export class Sect {
  public section:string = "";
  public sel:string = "";
}
