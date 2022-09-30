import { Component, OnInit } from '@angular/core';
import { SecSetService } from 'src/app/navbar/menu/sec-ch.service';
import { Md5 } from 'ts-md5';
import { AllItemsService } from '../../all-items.service';
import { DataGetterService } from '../../data-getting.service';
import { ImageGettingService } from '../../get-img-url.service';
import { Resource } from '../../items.service';
import { Planet } from './planet-class';
import { PlanetService } from './planet.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  planets:Planet[] = []
  constructor(private set:SecSetService, private getter:PlanetService) { }

  ngOnInit() {
    this.set.sec.section = "resources";
    this.set.sec.sel = "location";
    this.GetPlanets();
  }
  GetPlanets() {
    this.getter.GetPlanetBuffer().then(val => this.planets = val);
  }
}
