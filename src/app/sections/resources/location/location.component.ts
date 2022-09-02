import { Component, OnInit } from '@angular/core';
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
  constructor(private getter:PlanetService) { }

  ngOnInit() {
    this.GetPlanets();
    
  }
  GetPlanets() {
    this.getter.GetPlanetBuffer().then(val => this.planets = val);
  }
}
