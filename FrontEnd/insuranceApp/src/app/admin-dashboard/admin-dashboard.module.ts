import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompaniesComponent } from './components/companies/companies.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import * as CanvasJSAngularChart from 'src/assets/canvasjs/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


@NgModule({
  declarations: [
    DashboardComponent,
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
  ],
  providers: [ DatePipe ]
})
export class AdminDashboardModule { }
