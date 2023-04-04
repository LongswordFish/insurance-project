import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedBundleListComponent } from './purchased-bundle-list.component';

describe('PurchasedBundleListComponent', () => {
  let component: PurchasedBundleListComponent;
  let fixture: ComponentFixture<PurchasedBundleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedBundleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasedBundleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
