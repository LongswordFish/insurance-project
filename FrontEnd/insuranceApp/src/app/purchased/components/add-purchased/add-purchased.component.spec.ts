import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchasedComponent } from './add-purchased.component';

describe('AddPurchasedComponent', () => {
  let component: AddPurchasedComponent;
  let fixture: ComponentFixture<AddPurchasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchasedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
