import { TestBed } from '@angular/core/testing';

import { PpCompanyService } from './pp-company.service';

describe('PpCompanyService', () => {
  let service: PpCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
