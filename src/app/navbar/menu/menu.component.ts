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
    let urlmass = window.location.href.split('/');
    let curr = urlmass[urlmass.length-1];
    this.selected = curr;
  }

}
