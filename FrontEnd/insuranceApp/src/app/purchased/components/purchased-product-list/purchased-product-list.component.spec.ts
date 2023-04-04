import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedProductListComponent } from './purchased-product-list.component';

describe('PurchasedProductListComponent', () => {
  let component: PurchasedProductListComponent;
  let fixture: ComponentFixture<PurchasedProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasedProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
