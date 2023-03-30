import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDashNotificationViewComponent } from './client-dash-notification-view.component';

describe('ClientDashNotificationViewComponent', () => {
  let component: ClientDashNotificationViewComponent;
  let fixture: ComponentFixture<ClientDashNotificationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDashNotificationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDashNotificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
