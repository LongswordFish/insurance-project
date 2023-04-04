import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from './notification/notification.module';
import { CompanyStatsModule } from './company-stats/company-stats.module';

import { ClaimDashboardModule } from './claim-dashboard/claim-dashboard.module';
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

import { PurchasedModule } from './purchased/purchased.module';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AllBundlesComponent } from './components/bundle/all-bundles/all-bundles.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddBundleComponent } from './components/bundle/add-bundle/add-bundle.component';
import { AddClaimsComponent } from './components/add-claims/add-claims.component';
import { BundleDetailsComponent } from './components/bundle/bundle-details/bundle-details.component';
import { ClientNavComponent } from './components/client-nav/client-nav.component';
import { PublicNavComponent } from './components/public-nav/public-nav.component';
import { ClientProfileModule } from './client-profile/client-profile.module';
import { RegisterloginComponent } from './authentication/registerlogin/registerlogin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthenticateService } from './authentication/services/authenticate.service';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SideCompanyDashComponent,
    AddProductComponent,
    AddBundleComponent,
    AddClaimsComponent,
    AllBundlesComponent,
    BundleDetailsComponent,
    BundleFilterPipe,
    ClientNavComponent,
    PublicNavComponent,
    RegisterloginComponent,
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
    ClientProfileModule
  ],
  providers: [AuthenticateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
