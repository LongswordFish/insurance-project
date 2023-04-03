import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashNotificationViewComponent } from './company-dash-notification-view.component';

describe('CompanyDashNotificationViewComponent', () => {
  let component: CompanyDashNotificationViewComponent;
  let fixture: ComponentFixture<CompanyDashNotificationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDashNotificationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDashNotificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
