import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { AddAProductComponent } from './components/addproduct/addproduct.component';
import { ProductService } from './services/product.service';
import { ClientService } from './services/client.service';
import { CompanyStatsListPageComponent } from './components/company-stats-list-page/company-stats-list-page.component';
import { UpdateProductDialogComponent } from './components/update-product-dialog/update-product-dialog.component';
import { ProductDetailsPageComponent } from './components/product-details-page/product-details-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';




@NgModule({
  declarations: [
    CompanyStatsListPageComponent,
    UpdateProductDialogComponent,
    ProductDetailsPageComponent,
    AddAProductComponent
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  providers: [ProductService, ClientService],
})
export class CompanyStatsModule { }
