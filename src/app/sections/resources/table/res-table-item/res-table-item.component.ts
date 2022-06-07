import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-res-table-item',
  templateUrl: './res-table-item.component.html',
  styleUrls: ['./res-table-item.component.scss']
})
export class ResTableItemComponent implements OnInit {
  @Input()
  icon:string = "../../../../../assets/resources/95x95.png";
  @Input()
  name:string = "ERR";
  @Input()
  ownedNumber:number = 0;
  @Input()
  mastered:boolean = false;
  constructor() { }

  ngOnInit(): void {
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
