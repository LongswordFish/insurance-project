import { TestBed } from '@angular/core/testing';
import { BundleService } from 'src/app/bundle.service';



describe('BundleService', () => {
  let service: BundleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BundleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
