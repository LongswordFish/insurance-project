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
import { AllBundlesComponent } from './components/bundle/all-bundles/all-bundles.component';
import { BundleDetailsComponent } from './components/bundle/bundle-details/bundle-details.component';
import { BuyBundleComponent } from './purchased/components/buy-bundle/buy-bundle.component';
import { PurchasedBundleListComponent } from './purchased/components/purchased-bundle-list/purchased-bundle-list.component';
import { PurchasedProductListComponent } from './purchased/components/purchased-product-list/purchased-product-list.component';
import { ClaimCreateComponent } from './claim-dashboard/claim-create/claim-create.component';
import { ClaimViewComponent } from './claim-dashboard/claim-view/claim-view.component';
import { ClientnavbarComponent } from './client-dashboard/clientnavbar/clientnavbar.component';
import { ClientViewComponent } from './client-dashboard/client-view/client-view.component';
import { ClientProfileComponent } from './client-profile/components/client-profile/client-profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { CompanyGuard } from './guards/company.guard';
const routes: Routes = [
  //common routes:
  {
    path: 'register-login',
    component: RegisterloginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'contact',
    component: ContactUsComponent,
  },
  //clients flow:
  {
    path: 'client-view',
    component: ClientViewComponent,
    canActivate: [ClientGuard],
  },
  {
    path: 'buy-product/:productId',
    component: BuyProductComponent,
    canActivate: [ClientGuard],
  },
  {
    path: 'buy-bundle/:bundleId',
    component: BuyBundleComponent,
    canActivate: [ClientGuard],
  },
  { path: 'claims', component: ClaimViewComponent },
  { path: 'my-plans', component: MyPlanViewComponent },
  { path: 'create-claim', component: ClaimCreateComponent },
  {
    path: 'client-profile',
    loadChildren: () =>
      import('./client-profile/client-profile.module').then(
        (m) => m.ClientProfileModule
      ),
    canActivate: [ClientGuard],
  },
  {
    path: 'notification/clientView',
    component: ClientDashNotificationViewComponent,
    canActivate: [ClientGuard],
  },
  // company flow
  {
    path: 'companyStats',
    redirectTo: 'companyStatsHome',
    pathMatch: 'full',
  },
  {
    path: 'companyStatsHome',
    component: CompanyStatsListPageComponent,
    canActivate: [CompanyGuard],
  },
  {
    path: 'productDetails',
    component: ProductDetailsPageComponent,
    canActivate: [CompanyGuard],
  },
  {
    path: 'addProduct',
    component: AddAProductComponent,
    canActivate: [CompanyGuard],
  },
  {
    path: 'add-bundle',
    component: AddBundleComponent,
    canActivate: [CompanyGuard],
  },
  {
    path: 'viewAllBundles',
    component: AllBundlesComponent,
    canActivate: [CompanyGuard],
  },
  {
    path: 'bundles/:id',
    component: BundleDetailsComponent,
    canActivate: [CompanyGuard],
  },
  {
    path: 'company-profile',
    loadChildren: () =>
      import('./company-profile/company-profile.module').then(
        (m) => m.CompanyProfileModule
      ),
    canActivate: [CompanyGuard],
  },
  {
    path: 'notification/companyview',
    component: CompanyDashNotificationViewComponent,
    canActivate: [CompanyGuard],
  },
  //admin flow
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
    canActivate: [AdminGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
