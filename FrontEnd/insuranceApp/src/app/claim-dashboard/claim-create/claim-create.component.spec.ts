import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCreateComponent } from './claim-create.component';

describe('ClaimCreateComponent', () => {
  let component: ClaimCreateComponent;
  let fixture: ComponentFixture<ClaimCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
