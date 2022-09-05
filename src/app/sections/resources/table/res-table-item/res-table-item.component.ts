import { Component, Input, OnInit } from '@angular/core';
import { Resource } from 'src/app/sections/items.service';
import { ResourceInfoChangeService } from 'src/app/sections/resource-info-changing-request.service';

@Component({
  selector: 'app-res-table-item',
  templateUrl: './res-table-item.component.html',
  styleUrls: ['./res-table-item.component.scss']
})
export class ResTableItemComponent implements OnInit {
  @Input()
  item:Resource = new Resource("", "",[""]);

  blueprint:boolean = false;
  constructor(private save: ResourceInfoChangeService) { }

  ngOnInit(): void {
    if (this.item.name.toLowerCase().includes('blueprint')) this.blueprint = true;
  }
   // Only Integer Numbers
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  //Changed Resource number save
  saveNewResNum()
  {
    this.save.ResourceNumberChange({Resource: this.item.id, Number: this.item.owned, Type: "resource"}).subscribe({
      next(value) {
      },
      error(err) {
        alert(err)
      }
    })
  }
  // Set zero if field is null
  setZero(event:any)
  {
    if (event.target.value == "" 
    || event.target.value == null 
    || event.target.value == undefined) {
      event.target.value = 0;
      return true;
    }
    try {
      if (event.target.value.length > 1 ) {
        event.target.value = (+event.target.value).toString();
        return true;
      }
      return false;
    }
    catch (err) {
      return false;
    }
  }
}
