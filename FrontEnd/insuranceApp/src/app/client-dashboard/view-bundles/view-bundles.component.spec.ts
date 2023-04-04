import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBundlesComponent } from './view-bundles.component';

describe('ViewBundlesComponent', () => {
  let component: ViewBundlesComponent;
  let fixture: ComponentFixture<ViewBundlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBundlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBundlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
