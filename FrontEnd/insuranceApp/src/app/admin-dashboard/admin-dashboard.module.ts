import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CompaniesComponent } from './companies/companies.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import * as CanvasJSAngularChart from 'src/assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


@NgModule({
  declarations: [
    DashboardComponent,
    NavigationComponent,
    CompaniesComponent,
    CanvasJSChart
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    NgbModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AdminDashboardModule { }
