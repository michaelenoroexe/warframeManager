import { TestBed } from '@angular/core/testing';

import { ItemDisplayService } from './item-display.service';

describe('ItemDisplayService', () => {
  let service: ItemDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
