import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewreviewComponent } from './viewreview.component';

describe('ViewreviewComponent', () => {
  let component: ViewreviewComponent;
  let fixture: ComponentFixture<ViewreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
