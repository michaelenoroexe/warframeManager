import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArsTableItemComponent } from './arsres-table-item.component';

describe('ResTableItemComponent', () => {
  let component: ArsTableItemComponent;
  let fixture: ComponentFixture<ArsTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArsTableItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArsTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
