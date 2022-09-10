import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftingTableComponent } from './crafting-table.component';

describe('CraftingTableComponent', () => {
  let component: CraftingTableComponent;
  let fixture: ComponentFixture<CraftingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraftingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraftingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
