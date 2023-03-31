import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewProductComponent } from './client-dashboard/view-product/view-product.component';

const routes: Routes = [
  { path: 'view-product', component: ViewProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
