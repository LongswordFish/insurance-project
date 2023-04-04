import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimViewComponent } from './claim-view.component';

describe('ClaimViewComponent', () => {
  let component: ClaimViewComponent;
  let fixture: ComponentFixture<ClaimViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
