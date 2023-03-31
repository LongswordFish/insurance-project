import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
