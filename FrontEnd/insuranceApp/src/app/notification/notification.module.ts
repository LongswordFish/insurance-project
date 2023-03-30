import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { CompanyDashNotificationViewComponent } from './company-dash-notification-view/company-dash-notification-view.component';
import { ClientDashNotificationViewComponent } from './client-dash-notification-view/client-dash-notification-view.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    CompanyDashNotificationViewComponent,
    ClientDashNotificationViewComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NotificationRoutingModule,
    MatIconModule,
    MatListModule,
    MatCardModule
    
  ],
  exports: [
    CompanyDashNotificationViewComponent,
    ClientDashNotificationViewComponent
  ]
})
export class NotificationModule { }
