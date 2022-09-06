import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  chosenSection:string = "resources";
  selected:string = "";
  nam:string = "";
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let url = window.location.href;
    if (url.includes('arsenal')) {
      this.chosenSection = 'arsenal';
      if (url.includes('arstable')) this.selected = 'arstable';
      else if (url.includes('loc')) this.selected = 'loc';
    }
    if (url.includes('resources')) {
      this.chosenSection = 'resources';
      if (url.includes('location')) this.selected = 'location';
      else if (url.includes('table')) this.selected = 'table';
    }

  }

}
