import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientmainComponent } from './clientmain.component';

describe('ClientmainComponent', () => {
  let component: ClientmainComponent;
  let fixture: ComponentFixture<ClientmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientmainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
