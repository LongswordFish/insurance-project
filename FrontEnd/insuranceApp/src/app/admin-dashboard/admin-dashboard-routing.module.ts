import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CompaniesComponent } from './companies/companies.component';

const routes: Routes = [
  { path: '',    component: DashboardComponent },
  { path: 'companies',    component: CompaniesComponent },
];

export const routedComponents = [DashboardComponent, CompaniesComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
