import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBundlesComponent } from './all-bundles.component';

describe('AllBundlesComponent', () => {
  let component: AllBundlesComponent;
  let fixture: ComponentFixture<AllBundlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBundlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBundlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
