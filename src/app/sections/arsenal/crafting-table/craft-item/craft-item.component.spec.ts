import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftItemComponent } from './craft-item.component';

describe('CraftItemComponent', () => {
  let component: CraftItemComponent;
  let fixture: ComponentFixture<CraftItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraftItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraftItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
