import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';

export function tokengetter(){
  return localStorage.getItem("token");
}

const routes: Routes = [
  {
    path: '',component:RegisterComponent
  },
  {
    path: 'login',component:LoginComponent
  }
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
