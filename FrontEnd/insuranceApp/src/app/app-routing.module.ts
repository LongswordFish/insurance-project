import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { MyPlanViewComponent } from './purchased/components/my-plan-view/my-plan-view.component';
import { BuyProductComponent } from './purchased/components/buy-product/buy-product.component';

export function tokengetter(){
  return sessionStorage.getItem("token");
}

const routes: Routes = [
  {
    path: '',component:RegisterComponent
  },
  {
    path: 'login',component:LoginComponent
  },
  {path:'my-plans',component:MyPlanViewComponent},
  {path:'buy-product',component:BuyProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  JwtModule.forRoot({
    config:{
      tokenGetter: tokengetter,
      allowedDomains:['localhost:9000'],
      disallowedRoutes:[],
    }
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
