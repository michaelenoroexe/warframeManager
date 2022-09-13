import { Component, Input, OnInit } from '@angular/core';
import { Resource } from 'src/app/sections/items.service';
import { NumFieldChangeService } from 'src/app/sections/num-field-change.service';
import { ResourceInfoChangeService } from 'src/app/sections/resource-info-changing-request.service';

@Component({
  selector: 'app-ars-table-item',
  templateUrl: './arsres-table-item.component.html',
  styleUrls: ['./arsres-table-item.component.scss']
})
export class ArsTableItemComponent implements OnInit {
  @Input()
  item:Resource = new Resource("", "",[""]);

  blueprint:boolean = false;
  constructor(public ch:NumFieldChangeService) { }

  ngOnInit(): void { }
}
