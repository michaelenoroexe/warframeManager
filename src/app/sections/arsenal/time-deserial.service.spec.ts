import { TestBed } from '@angular/core/testing';

import { TimeDeserialService } from './time-deserial.service';

describe('TimeDeserialService', () => {
  let service: TimeDeserialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeDeserialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
