import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { CompanyDashNotificationViewComponent } from './company-dash-notification-view/company-dash-notification-view.component';
import { ClientDashNotificationViewComponent } from './client-dash-notification-view/client-dash-notification-view.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SendNotifcationDialogComponent } from './send-notifcation-dialog/send-notifcation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { NotificationFilterPipe  } from './pipe/search.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    CompanyDashNotificationViewComponent,
    ClientDashNotificationViewComponent,
    SendNotifcationDialogComponent,
    NotificationFilterPipe 
  ],
  imports: [
    FormsModule,
    CommonModule,
    NotificationRoutingModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatToolbarModule,
    NgxPaginationModule
    
  ],
  exports: [
    CompanyDashNotificationViewComponent,
    ClientDashNotificationViewComponent,
  ]
})
export class NotificationModule { }
