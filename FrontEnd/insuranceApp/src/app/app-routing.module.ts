import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { RegisterloginComponent } from './authentication/registerlogin/registerlogin.component';
import { ClientDashNotificationViewComponent } from './notification/client-dash-notification-view/client-dash-notification-view.component';
import { CompanyDashNotificationViewComponent } from './notification/company-dash-notification-view/company-dash-notification-view.component';
import { AddAProductComponent } from './company-stats/components/addproduct/addproduct.component';
import { CompanyStatsListPageComponent } from './company-stats/components/company-stats-list-page/company-stats-list-page.component';
import { ProductDetailsPageComponent } from './company-stats/components/product-details-page/product-details-page.component';
import { MyPlanViewComponent } from './purchased/components/my-plan-view/my-plan-view.component';
import { BuyProductComponent } from './purchased/components/buy-product/buy-product.component';

import { ViewProductComponent } from './client-dashboard/view-product/view-product.component';
import { ViewBundlesComponent } from './client-dashboard/view-bundles/view-bundles.component';

import { AddBundleComponent } from './components/bundle/add-bundle/add-bundle.component';
import { AddClaimsComponent } from './components/add-claims/add-claims.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AllBundlesComponent } from './components/bundle/all-bundles/all-bundles.component';
import { BundleDetailsComponent } from './components/bundle/bundle-details/bundle-details.component';
import { BuyBundleComponent } from './purchased/components/buy-bundle/buy-bundle.component';
import { PurchasedBundleListComponent } from './purchased/components/purchased-bundle-list/purchased-bundle-list.component';
import { PurchasedProductListComponent } from './purchased/components/purchased-product-list/purchased-product-list.component';
import { ClaimCreateComponent } from './claim-dashboard/claim-create/claim-create.component';
import { ClaimViewComponent } from './claim-dashboard/claim-view/claim-view.component';
import { ClientProfileComponent } from './client-profile/components/client-profile/client-profile.component';
import { ClientnavbarComponent } from './client-dashboard/clientnavbar/clientnavbar.component';
const routes: Routes = [
  {
    path: '',
    component: RegisterloginComponent,
  },
  {
    path: 'companyStats',
    redirectTo: 'companyStatsHome',
    pathMatch: 'full',
  },
  {
    path: 'companyStatsHome',
    component: CompanyStatsListPageComponent,
  },
  {
    path: 'productDetails',
    component: ProductDetailsPageComponent,
  },
  {
    path: 'addProduct',
    component: AddAProductComponent,
  },
  { path: 'add-product', component: AddProductComponent },
  { path: 'add-bundle', component: AddBundleComponent },
  { path: 'viewAllBundles', component: AllBundlesComponent },
  { path: 'bundles/:id', component: BundleDetailsComponent },
  { path: 'claims', component: ClaimViewComponent },
  { path: 'my-plans', component: MyPlanViewComponent },
  { path: 'buy-product/:productId', component: BuyProductComponent },
  { path: 'buy-bundle/:bundleId', component: BuyBundleComponent },
  { path: 'create-claim', component: ClaimCreateComponent },
  {
    path: 'company-profile',
    loadChildren: () =>
      import('./company-profile/company-profile.module').then(
        (m) => m.CompanyProfileModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
  },
  {
    path: 'notification/companyview',
    component: CompanyDashNotificationViewComponent,
  },
  {
    path: 'notification/clientView',
    component: ClientDashNotificationViewComponent,
  },
  {path:'client-profile',component:ClientProfileComponent},

  { path: 'view-product', component: ViewProductComponent },
  { path: 'view-bundles', component: ViewBundlesComponent },
  {path:'clientnavbar',component:ClientnavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
