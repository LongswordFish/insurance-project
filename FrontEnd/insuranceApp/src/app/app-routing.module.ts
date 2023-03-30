import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { AddBundleComponent } from './add-bundle/add-bundle.component';
import { AddClaimsComponent } from './add-claims/add-claims.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AllBundlesComponent } from './all-bundles/all-bundles.component';
import { BundleDetailsComponent } from './bundle-details/bundle-details.component';

const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'add-bundle', component: AddBundleComponent },
  { path: 'viewAllBundles', component: AllBundlesComponent },
  { path: 'bundles/:id', component: BundleDetailsComponent },
  { path: 'claims', component: AddClaimsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
=======
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';

export function tokengetter(){
  return sessionStorage.getItem("token");
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
>>>>>>> 825d6913f89622335739e02dd53b046d3f69afca
