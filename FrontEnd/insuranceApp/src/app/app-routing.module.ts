import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { RegisterloginComponent } from './authentication/registerlogin/registerlogin.component';

export function tokengetter(){
  return sessionStorage.getItem("token");
}

const routes: Routes = [
  {
    path: '',component:RegisterloginComponent
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
