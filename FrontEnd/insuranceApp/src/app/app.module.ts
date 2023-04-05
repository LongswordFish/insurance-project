import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from './notification/notification.module';
import { CompanyStatsModule } from './company-stats/company-stats.module';

import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FooterComponent } from './components/footer/footer.component';
import { SideCompanyDashComponent } from './components/side-company-dash/side-company-dash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BundleFilterPipe } from './bundle-filter.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ClaimDashboardModule } from './claim-dashboard/claim-dashboard.module';

import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AllBundlesComponent } from './components/bundle/all-bundles/all-bundles.component';
import { AddBundleComponent } from './components/bundle/add-bundle/add-bundle.component';
import { AddClaimsComponent } from './components/add-claims/add-claims.component';
import { BundleDetailsComponent } from './components/bundle/bundle-details/bundle-details.component';
import { ClientNavComponent } from './components/client-nav/client-nav.component';
import { PublicNavComponent } from './components/public-nav/public-nav.component';
import { ClientProfileModule } from './client-profile/client-profile.module';
import { RegisterloginComponent } from './authentication/registerlogin/registerlogin.component';

// import { ClientDashboardModule } from './client-dashboard/client-dashboard.module';
import { ClientnavbarComponent } from './client-dashboard/clientnavbar/clientnavbar.component';

import { ViewProductComponent } from './client-dashboard/view-product/view-product.component';
import { ViewBundlesComponent } from './client-dashboard/view-bundles/view-bundles.component';

import { MatTabsModule } from '@angular/material/tabs';
import { AuthenticateService } from './authentication/services/authenticate.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClientDashboardModule } from './client-dashboard/client-dashboard.module';
import { PurchasedModule } from './purchased/purchased.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SideCompanyDashComponent,
    AddBundleComponent,
    AddClaimsComponent,
    AllBundlesComponent,
    BundleDetailsComponent,
    ClientNavComponent,
    PublicNavComponent,
    RegisterloginComponent,
    ClientnavbarComponent,
    AboutUsComponent,
    ContactUsComponent,
    AboutUsComponent,
    ContactUsComponent,

    // ViewProductComponent,
    // ViewBundlesComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NotificationModule,
    NgbModule,
    CompanyStatsModule,
    FormsModule,
    HttpClientModule,
    ClaimDashboardModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    PurchasedModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    RouterModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    ModalModule.forRoot(),
    ClientProfileModule,
    ClientDashboardModule,
  ],
  providers: [AuthenticateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
