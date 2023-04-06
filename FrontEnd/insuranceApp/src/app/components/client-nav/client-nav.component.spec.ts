import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNavComponent } from './client-nav.component';

describe('ClientNavComponent', () => {
  let component: ClientNavComponent;
  let fixture: ComponentFixture<ClientNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
