import { NgFor, DecimalPipe, AsyncPipe, NgIf } from '@angular/common';
import { Component, QueryList, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductDialogComponent } from '../update-product-dialog/update-product-dialog.component';
import { AddProductComponent } from '../addproduct/addproduct.component';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-company-stats-list-page',
  templateUrl: './company-stats-list-page.component.html',
  styleUrls: ['./company-stats-list-page.component.css'],
})

export class CompanyStatsListPageComponent {

  productArr: Array<Product>;
  productUnavailableArr: Array<Product>;
  purchasedProduct: Array<any>;
  listClientIDs: Array<any>;
  companyID: string = "CMP12355";

  token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODAxNTMzMzYsImV4cCI6MTcxMTY4OTMzNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJjb21wYW55In0.vhDwqEceK-VwZAlcXtxkfaKydwE94rQ24s4iItJT8gU";
  // displayedColumns: string[] = ["productId", "name", "category", "isAvailable", "price", "delete", "update"];
  displayedColumns: string[] = ["productId", "name", "category", "price", "delete", "update"];

  dataSourceProduct!: MatTableDataSource<Product>
  dataSourceUnavailableProduct!: MatTableDataSource<Product>

  obsAvailableProds!: Observable<any>
  obsUnavailableProds!: Observable<any>
  @ViewChild('availablePaginator') paginatorAvailableProds!: MatPaginator;
  @ViewChild(MatSort) sortAvailableProds!: MatSort;

  @ViewChild('unavailablePaginator') paginatorUnavailableProds!: MatPaginator;
  @ViewChild(MatSort) sortUnavailableProds!: MatSort;

  constructor(private router: Router, private productService: ProductService, public dialog: MatDialog, private _snackBar: MatSnackBar){
    this.productArr = [];
    this.productUnavailableArr = [];
    this.purchasedProduct = [];
    this.listClientIDs = [];

    //backend call for getting all  products by companyID:
    this.loadProducts();
    this.loadUnavailableProducts();
  }


  //function to load products
  loadProducts(){
    console.log("anything")
    this.productService.getAllProductsByCompanyID(this.companyID)
      .subscribe((response) => {
      this.productArr = response.filter( (product) => product.available == true);
      // this.productUnavailableArr = response.filter( (product) => product.available == false);
      
      this.dataSourceProduct = new MatTableDataSource(this.productArr);
      this.dataSourceProduct.paginator = this.paginatorAvailableProds;
      this.dataSourceProduct.sort = this.sortAvailableProds;
      
      this.obsAvailableProds = this.dataSourceProduct.connect();
      // this.dataSourceUnavailableProduct = new MatTableDataSource(this.productUnavailableArr);
      // this.dataSourceUnavailableProduct.paginator = this.paginator;
      // this.dataSourceUnavailableProduct.sort = this.sort;

      }, (err) => {
      console.log(err);
      });
  }


  loadUnavailableProducts(){
    this.productService.getAllProductsByCompanyID(this.companyID)
      .subscribe((response) => {
      this.productUnavailableArr = response.filter( (product) => product.available == false);

      this.dataSourceUnavailableProduct = new MatTableDataSource(this.productUnavailableArr);
      this.dataSourceUnavailableProduct.paginator = this.paginatorUnavailableProds;
      this.dataSourceUnavailableProduct.sort = this.sortUnavailableProds;

      this.obsUnavailableProds = this.dataSourceUnavailableProduct.connect();
      }, (err) => {
      console.log(err);
      });
  }



  //function to add a new product
  addProduct(){
    // this.router.navigate(['addProduct'], {queryParams: {companyID: this.companyID}});

    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '500px',
      data: this.companyID
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'success'){
        //refresh the table data
        // this.loadProducts();

      }
    });
  }

  // =============== Methds for Available Products ====================
  //function for filtering?: searchBar
  applyFilterAvailaibleProducts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProduct.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceProduct.paginator) {
      this.dataSourceProduct.paginator.firstPage();
    }
  }

  //delete product function
  deleteAvailaibleProduct(product: Product) {
    // You can call the deleteProduct() method of the ProductService to delete the product from the backend
    this.productService.deleteProductByProductID(product.productId)
      .subscribe((response) => {
        // If the product is successfully deleted from the backend, remove it from the table
        this.productArr = this.productArr.filter((p) => p.productId !== product.productId);
        this.dataSourceProduct = new MatTableDataSource(this.productArr);
        this.dataSourceProduct.paginator = this.paginatorAvailableProds;
        this.dataSourceProduct.sort = this.sortAvailableProds;
        this.obsAvailableProds = this.dataSourceProduct.connect();

        this._snackBar.open("Product deleted successfully!!", "Close");
        this.loadProducts();
      }, (err) => {
        console.log(err);
        this._snackBar.open("Product was not deleted!!", "Close");
      });
  }

  //updating the product
  updateAvailaibleProduct(product: Product) {
    const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
      width: '500px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'success'){
        //refresh the table data
        this.loadProducts();
      }
    });
  }
  



  // =============== Methds for Unavailable Products ====================
  //function for filtering?: searchBar
  applyFilterUnavailaibleProducts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUnavailableProduct.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceUnavailableProduct.paginator) {
      this.dataSourceUnavailableProduct.paginator.firstPage();
    }
  }

  //delete product function
  deleteUnavailaibleProduct(product: Product) {
    // You can call the deleteProduct() method of the ProductService to delete the product from the backend
    this.productService.deleteProductByProductID(product.productId)
      .subscribe((response) => {
        // If the product is successfully deleted from the backend, remove it from the table
        this.productUnavailableArr = this.productUnavailableArr.filter((p) => p.productId !== product.productId);
        this.dataSourceUnavailableProduct = new MatTableDataSource(this.productUnavailableArr);
        this.dataSourceUnavailableProduct.paginator = this.paginatorUnavailableProds;
        this.dataSourceUnavailableProduct.sort = this.sortUnavailableProds;
        this.obsUnavailableProds = this.dataSourceUnavailableProduct.connect();

        this._snackBar.open("Product deleted successfully!!", "Close");
        this.loadProducts();
      }, (err) => {
        console.log(err);
        this._snackBar.open("Product was not deleted!!", "Close");
      });
  }

  //updating the product
  updateUnavailaibleProduct(product: Product) {
    const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
      width: '500px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'success'){
        //refresh the table data
        this.loadProducts();
      }
    });
  }


  //function for routing on click of record of table
  navigateToDetails(rowData: any) {
    console.log(rowData);
    this.router.navigate(['productDetails'], {queryParams: {productID: rowData.productId}}); 
  }
  
  
}















//backend call for getting all purchased products to get client IDs, as each obj of it contains the clientID
    // this.clientService.getAllPurhcasedProducts("CMP12355")
    //                   .subscribe((response) => {
    //                     this.purchasedProduct = response;
    //                     console.log(response);

    //                     this.listClientIDs = this.purchasedProduct.map( (ele) => ele.clientId);
                        
    //                     // this.listClientIDs = [...new Set(this.listClientIDs)];
    //                     this.listClientIDs = Array.from(new Set(this.listClientIDs).values());
    //                     // console.log(this.listClientIDs);
    //                   }, (err) => {
    //                     console.log(err);
    //                   })

    
   //backend call for getting the clientDetails by clientID
  //  this.clientService.getClientDetailsByClientID(1)
  //                    .subscribe((response) => {
  //                     console.log(response);
  //                    }, (err) => {
  //                     console.log(err);
  //                    })