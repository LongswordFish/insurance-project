import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClaimsComponent } from './add-claims.component';

describe('AddClaimsComponent', () => {
  let component: AddClaimsComponent;
  let fixture: ComponentFixture<AddClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClaimsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
