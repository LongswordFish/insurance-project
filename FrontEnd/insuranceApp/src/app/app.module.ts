import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { CompanyNavComponent } from './company-nav/company-nav.component';
import { FooterComponent } from './footer/footer.component';
import { SideCompanyDashComponent } from './side-company-dash/side-company-dash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AllBundlesComponent } from './all-bundles/all-bundles.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddBundleComponent } from './add-bundle/add-bundle.component';
import { AddClaimsComponent } from './add-claims/add-claims.component';
import { BundleDetailsComponent } from './bundle-details/bundle-details.component';
=======
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
>>>>>>> 825d6913f89622335739e02dd53b046d3f69afca

import { CompanyNavComponent } from './company-nav/company-nav.component';
import { FooterComponent } from './footer/footer.component';
import { SideCompanyDashComponent } from './side-company-dash/side-company-dash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AllBundlesComponent } from './all-bundles/all-bundles.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddBundleComponent } from './add-bundle/add-bundle.component';
import { AddClaimsComponent } from './add-claims/add-claims.component';
import { BundleDetailsComponent } from './bundle-details/bundle-details.component';

import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
<<<<<<< Updated upstream
<<<<<<< HEAD
=======

>>>>>>> Stashed changes
    CompanyNavComponent,
    FooterComponent,
    SideCompanyDashComponent,
    AddProductComponent,
    AddBundleComponent,
    AddClaimsComponent,
    AllBundlesComponent,
    BundleDetailsComponent,
<<<<<<< Updated upstream
=======
    RegisterComponent,
    LoginComponent
>>>>>>> 825d6913f89622335739e02dd53b046d3f69afca
=======

    RegisterComponent,
    LoginComponent

>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
<<<<<<< Updated upstream
<<<<<<< HEAD
=======

>>>>>>> Stashed changes
    HttpClientModule,
    NgbModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    MatSelectModule,
    MatOptionModule,
<<<<<<< Updated upstream
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
=======
    NgbModule,
    FormsModule,
    HttpClientModule
=======
>>>>>>> Stashed changes
  ],
  providers: [],
  bootstrap: [AppComponent],
})
<<<<<<< Updated upstream
export class AppModule { }
>>>>>>> 825d6913f89622335739e02dd53b046d3f69afca
=======
export class AppModule {}
>>>>>>> Stashed changes
