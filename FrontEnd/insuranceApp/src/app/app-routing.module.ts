import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewProductComponent } from './client-dashboard/view-product/view-product.component';
import { ViewBundlesComponent } from './client-dashboard/view-bundles/view-bundles.component';

const routes: Routes = [
  { path: 'view-product', component: ViewProductComponent },
  { path: 'view-bundles', component: ViewBundlesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
