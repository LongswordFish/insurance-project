import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewBundlesComponent } from './view-bundles/view-bundles.component';
import { ClientfooterComponent } from './clientfooter/clientfooter.component';
import { ClientmainComponent } from './clientmain/clientmain.component';
import { ClientnavbarComponent } from './clientnavbar/clientnavbar.component';
import { ClientViewComponent } from './client-view/client-view.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BundleFilterPipe } from '../bundle-filter.pipe';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [
    // ClientfooterComponent,
    // ClientmainComponent,
    // ClientnavbarComponent,
    ViewProductComponent,
    ViewBundlesComponent,
  
    ClientViewComponent,
    BundleFilterPipe
  ],
  imports: [
    CommonModule,
    ClientDashboardRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatCardModule
    
  ],
  exports: [
  //   ClientfooterComponent,
  //   ClientmainComponent,
  //   ClientnavbarComponent,
    ViewProductComponent,
    ViewBundlesComponent
  ]
})
export class ClientDashboardModule { }
