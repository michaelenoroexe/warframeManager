import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDisplayBoxComponent } from './error-display-box.component';

describe('ErrorDisplayBoxComponent', () => {
  let component: ErrorDisplayBoxComponent;
  let fixture: ComponentFixture<ErrorDisplayBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorDisplayBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorDisplayBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
