import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewBundlesComponent } from './view-bundles/view-bundles.component';
import { ClientfooterComponent } from './clientfooter/clientfooter.component';
import { ClientmainComponent } from './clientmain/clientmain.component';
import { ClientnavbarComponent } from './clientnavbar/clientnavbar.component';


@NgModule({
  declarations: [
    // ClientfooterComponent,
    // ClientmainComponent,
    // ClientnavbarComponent,
    //  ViewProductComponent,
    //  ViewBundlesComponent
  ],
  imports: [
    CommonModule,
    ClientDashboardRoutingModule
  ]
  // exports: [
  //   ClientfooterComponent,
  //   ClientmainComponent,
  //   ClientnavbarComponent,
  //   ViewProductComponent,
  //   ViewBundlesComponent
  // ]
})
export class ClientDashboardModule { }
