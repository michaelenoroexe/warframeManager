import { Component, Input, OnInit } from '@angular/core';
import { Resource } from 'src/app/sections/items.service';
import { NumFieldChangeService } from 'src/app/sections/num-field-change.service';
import { ResourceInfoChangeService } from 'src/app/sections/resource-info-changing-request.service';

@Component({
  selector: 'app-res-table-item',
  templateUrl: './res-table-item.component.html',
  styleUrls: ['./res-table-item.component.scss']
})
export class ResTableItemComponent implements OnInit {
  @Input()
  item:Resource = new Resource("", "",[""]);

  constructor(public ch:NumFieldChangeService) { }

  ngOnInit(): void {
  }
  
}
