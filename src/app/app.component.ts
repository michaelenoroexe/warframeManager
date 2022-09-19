import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { environment } from './../environments/environment';
import { ErrorDisplayerService } from './error-display-box/error-displayer.service';
import { AllItemsService } from './sections/all-items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'warframeManager';

// variables for displaing errors
@ViewChild('errContainer', { read: ViewContainerRef }) container: ViewContainerRef | undefined;
@ViewChild('err', { read: TemplateRef }) template: TemplateRef<any> | undefined;

  constructor(public errDisp:ErrorDisplayerService,public items:AllItemsService) {}
  
  ngAfterViewInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.errDisp.container = this.container;
    this.errDisp.template = this.template;
  }
}
