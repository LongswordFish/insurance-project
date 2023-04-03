import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBundleComponent } from './buy-bundle.component';

describe('BuyBundleComponent', () => {
  let component: BuyBundleComponent;
  let fixture: ComponentFixture<BuyBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyBundleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
