import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:FrontEnd/insuranceApp/src/app/authentication/registerlogin/registerlogin.component.spec.ts
import { RegisterloginComponent } from './registerlogin.component';

describe('RegisterloginComponent', () => {
  let component: RegisterloginComponent;
  let fixture: ComponentFixture<RegisterloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterloginComponent);
========
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
>>>>>>>> 94335b628f3b4b666e0be7ca0c2814a1684567fc:FrontEnd/insuranceApp/src/app/components/footer/footer.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
