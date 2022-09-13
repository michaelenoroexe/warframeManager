import { TestBed } from '@angular/core/testing';

import { NumFieldChangeService } from './num-field-change.service';

describe('NumFieldChangeService', () => {
  let service: NumFieldChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumFieldChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
