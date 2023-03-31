import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { ViewProductComponent } from './view-product/view-product.component';


@NgModule({
  declarations: [
    ViewProductComponent
  ],
  imports: [
    CommonModule,
    ClientDashboardRoutingModule
  ]
})
export class ClientDashboardModule { }
