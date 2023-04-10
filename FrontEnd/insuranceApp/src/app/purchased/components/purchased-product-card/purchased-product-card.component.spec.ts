import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedProductCardComponent } from './purchased-product-card.component';

describe('PurchasedProductCardComponent', () => {
  let component: PurchasedProductCardComponent;
  let fixture: ComponentFixture<PurchasedProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedProductCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasedProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
