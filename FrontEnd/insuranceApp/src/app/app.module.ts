import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientDashboardModule } from './client-dashboard/client-dashboard.module';
import { ClientnavbarComponent } from './client-dashboard/clientnavbar/clientnavbar.component';
import { ClientfooterComponent } from './client-dashboard/clientfooter/clientfooter.component';
import { ClientmainComponent } from './client-dashboard/clientmain/clientmain.component';
import { ViewProductComponent } from './client-dashboard/view-product/view-product.component';
import { ViewBundlesComponent } from './client-dashboard/view-bundles/view-bundles.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './shared/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BundleService } from './shared/bundle.service';
import { BundleFilterPipe } from './bundle-filter.pipe';
 

@NgModule({
  declarations: [
    AppComponent,
    ClientnavbarComponent,
    ClientfooterComponent,
    ClientmainComponent,
   ViewProductComponent,
    ViewBundlesComponent,
    BundleFilterPipe
    // ClientDashboardModule
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ClientDashboardModule
  ],

  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ProductService, BundleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
