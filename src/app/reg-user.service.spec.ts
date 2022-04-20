import { TestBed } from '@angular/core/testing';

import { RegUserService } from './reg-user.service';

describe('RegUserService', () => {
  let service: RegUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
