import { TestBed } from '@angular/core/testing';

import { PpBundleService } from './pp-bundle.service';

describe('PpBundleService', () => {
  let service: PpBundleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpBundleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
