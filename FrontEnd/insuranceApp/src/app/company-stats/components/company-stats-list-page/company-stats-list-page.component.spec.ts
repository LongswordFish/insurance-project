import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStatsListPageComponent } from './company-stats-list-page.component';

describe('CompanyStatsListPageComponent', () => {
  let component: CompanyStatsListPageComponent;
  let fixture: ComponentFixture<CompanyStatsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyStatsListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyStatsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
