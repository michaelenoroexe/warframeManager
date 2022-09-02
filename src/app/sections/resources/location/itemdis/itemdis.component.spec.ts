import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemdisComponent } from './itemdis.component';

describe('ItemdisComponent', () => {
  let component: ItemdisComponent;
  let fixture: ComponentFixture<ItemdisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemdisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemdisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
