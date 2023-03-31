import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNavComponent } from './company-nav.component';

describe('CompanyNavComponent', () => {
  let component: CompanyNavComponent;
  let fixture: ComponentFixture<CompanyNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
