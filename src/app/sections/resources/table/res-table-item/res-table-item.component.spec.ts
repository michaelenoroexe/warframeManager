import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResTableItemComponent } from './res-table-item.component';

describe('ResTableItemComponent', () => {
  let component: ResTableItemComponent;
  let fixture: ComponentFixture<ResTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResTableItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
