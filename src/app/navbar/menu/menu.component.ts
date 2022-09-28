import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SecSetService } from './sec-ch.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  nam:string = "";
  constructor(private route: ActivatedRoute, public set:SecSetService) {
  }

  ngOnInit(): void {
    let url = window.location.href;
    if (url.includes('arsenal')) {
      this.set.sec.section = 'arsenal';
      if (url.includes('arstable')) this.set.sec.sel = 'arstable';
      else if (url.includes('crafting')) this.set.sec.sel = 'crafting';
    }
    if (url.includes('resources')) {
      this.set.sec.section = 'resources';
      if (url.includes('location')) this.set.sec.sel = 'location';
      else if (url.includes('table')) this.set.sec.sel = 'table';
    }
    if (url.includes('userInfo')) {
      this.set.sec.section = '';
      this.set.sec.sel = 'account';
    }
  }

}
