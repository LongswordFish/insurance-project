import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashNotificationViewComponent } from './notification/client-dash-notification-view/client-dash-notification-view.component';
import { CompanyDashNotificationViewComponent } from './notification/company-dash-notification-view/company-dash-notification-view.component';

const routes: Routes = [
  { path: "notification/companyview", component: CompanyDashNotificationViewComponent, },
  { path: "notification/clientView", component: ClientDashNotificationViewComponent },
  { path: '**', redirectTo: "notification/clientView", pathMatch: 'full', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
