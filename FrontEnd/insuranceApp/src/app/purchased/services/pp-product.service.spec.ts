import { TestBed } from '@angular/core/testing';

import { PpProductService } from './pp-product.service';

describe('PpProductService', () => {
  let service: PpProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
