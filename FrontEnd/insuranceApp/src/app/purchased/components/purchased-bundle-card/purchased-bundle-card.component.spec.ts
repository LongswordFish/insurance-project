import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedBundleCardComponent } from './purchased-bundle-card.component';

describe('PurchasedBundleCardComponent', () => {
  let component: PurchasedBundleCardComponent;
  let fixture: ComponentFixture<PurchasedBundleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedBundleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasedBundleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
