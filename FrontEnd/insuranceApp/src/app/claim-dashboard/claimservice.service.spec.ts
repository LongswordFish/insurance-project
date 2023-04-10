import { TestBed } from '@angular/core/testing';

import { ClaimserviceService } from './claimservice.service';

describe('ClaimserviceService', () => {
  let service: ClaimserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
