import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNotifcationDialogComponent } from './send-notifcation-dialog.component';

describe('SendNotifcationDialogComponent', () => {
  let component: SendNotifcationDialogComponent;
  let fixture: ComponentFixture<SendNotifcationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendNotifcationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendNotifcationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
