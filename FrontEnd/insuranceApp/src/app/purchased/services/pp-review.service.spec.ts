import { TestBed } from '@angular/core/testing';

import { PpReviewService } from './pp-review.service';

describe('PpReviewService', () => {
  let service: PpReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
