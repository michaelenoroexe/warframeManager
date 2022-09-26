import { TestBed } from '@angular/core/testing';

import { UserInfoStorageService } from './user-info-storage.service';

describe('UserInfoStorageService', () => {
  let service: UserInfoStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
