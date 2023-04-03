import { TestBed } from '@angular/core/testing';

import { PurchasedService } from './purchased.service';

describe('PurchasedService', () => {
  let service: PurchasedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
