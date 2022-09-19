import { TestBed } from '@angular/core/testing';

import { ErrorDisplayerService } from './error-displayer.service';

describe('ErrorDisplayerService', () => {
  let service: ErrorDisplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorDisplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
