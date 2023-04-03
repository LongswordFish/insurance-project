import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './company-stats/components/addproduct/addproduct.component';
import { CompanyStatsListPageComponent } from './company-stats/components/company-stats-list-page/company-stats-list-page.component';
import { ProductDetailsPageComponent } from './company-stats/components/product-details-page/product-details-page.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "companyStatsHome",
    pathMatch: "full",
  },
  {
    path: "companyStatsHome",
    component: CompanyStatsListPageComponent,
  },{
    path: "productDetails",
    component: ProductDetailsPageComponent,
  },{
    path: "addProduct",
    component: AddProductComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
