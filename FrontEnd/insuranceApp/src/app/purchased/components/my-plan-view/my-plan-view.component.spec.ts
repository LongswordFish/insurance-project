import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlanViewComponent } from './my-plan-view.component';

describe('MyPlanViewComponent', () => {
  let component: MyPlanViewComponent;
  let fixture: ComponentFixture<MyPlanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPlanViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
