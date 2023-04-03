import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCompanyDashComponent } from './side-company-dash.component';

describe('SideCompanyDashComponent', () => {
  let component: SideCompanyDashComponent;
  let fixture: ComponentFixture<SideCompanyDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideCompanyDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideCompanyDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
