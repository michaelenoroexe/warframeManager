import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArsTableComponent } from './arstable.component';

describe('TableComponent', () => {
  let component: ArsTableComponent;
  let fixture: ComponentFixture<ArsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
