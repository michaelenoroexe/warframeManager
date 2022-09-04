import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  chosenSection:string = "resources";
  selected:string = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
    let url = window.location.href;
    if (url.includes('resources')) {
      this.chosenSection = 'resources';
      if (url.includes('location')) this.selected = 'location';
      else if (url.includes('table')) this.selected = 'table';
    }

  }

}
