import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPlanViewComponent } from './purchased/components/my-plan-view/my-plan-view.component';
import { BuyProductComponent } from './purchased/components/buy-product/buy-product.component';

import { AddBundleComponent } from './components/bundle/add-bundle/add-bundle.component';
import { AddClaimsComponent } from './components/add-claims/add-claims.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AllBundlesComponent } from './components/bundle/all-bundles/all-bundles.component';
import { BundleDetailsComponent } from './components/bundle/bundle-details/bundle-details.component';
import { BuyBundleComponent } from './purchased/components/buy-bundle/buy-bundle.component';

const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'add-bundle', component: AddBundleComponent },
  { path: 'viewAllBundles', component: AllBundlesComponent },
  { path: 'bundles/:id', component: BundleDetailsComponent },
  { path: 'claims', component: AddClaimsComponent },
  { path: 'my-plans', component: MyPlanViewComponent },
  { path: 'buy-product', component: BuyProductComponent },
  {path:'buy-bundle',component:BuyBundleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
