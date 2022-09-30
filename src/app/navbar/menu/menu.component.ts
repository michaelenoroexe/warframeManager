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

  ngOnInit(): void { }

}
