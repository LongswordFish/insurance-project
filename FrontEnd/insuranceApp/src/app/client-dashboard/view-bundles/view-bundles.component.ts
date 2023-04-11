import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Bundle } from '../bundle.model';
import { Bundle } from 'src/app/bundle';
import { BundleService } from 'src/app/shared/bundle.service';
import { BundleFilterPipe } from 'src/app/bundle-filter.pipe';

import { PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { pp_Product } from 'src/app/purchased/models/pp-Product.type';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from '../product.model';
import { CompanyModel } from 'src/app/admin-dashboard/models/company.model';
import { CompanyDataService } from 'src/app/admin-dashboard/services/company-data.service';
import { ProductIdToNamePipe } from '../pipes/product-id-to-name.pipe';


@Component({
  selector: 'app-view-bundles',
  templateUrl: './view-bundles.component.html',
  styleUrls: ['./view-bundles.component.css']
})
export class ViewBundlesComponent {
  bundles: Bundle[] = [];
  selectedBundle: Bundle | null = null;
  companies:CompanyModel[]=[];
  products:Product[]=[];
  constructor(
    private bundleService: BundleService,
    private snackBar: MatSnackBar,
    private httpClient:HttpClient,
    private companyService:CompanyDataService,
    private productService:ProductService
  ) {

  }
  searchText: string = '';
  filteredBundles: Bundle[] = [];

  // pagination
  pageSizeOptions: number[] = [5, 10, 15];
  pageSize: number = this.pageSizeOptions[0];
  pageIndex: number = 0;


  ngOnInit(): void {
    this.getAllCompanies();
    this.getAllProducts();   
    this.getAllBundles();
    
  }

  getBundleById(id: string): void {
    this.bundleService.getBundleById(id).subscribe(
      (data) => console.log(data),
      (error) => {
        console.log(error);
        this.snackBar.open('Bundle not found', 'Close', {
          duration: 2000,
        });
      }
    );
  }

  getAllBundles(): void {
    this.bundleService.getAllBundles().subscribe(
      (data) => {
        this.bundles = data;
      
        this.bundles.forEach(b=>{
          b.companyName=this.getCompanyNameByCompanyId(b.companyid);
          console.log("bid is "+b.bundleid);
          b.productNames=[];
          b.productids.forEach(pid=>{
            console.log(pid);
            console.log(this.getProductNameByProductId(pid));
            b.productNames?.push(this.getProductNameByProductId(pid))
          });
        }
        )
      },
      (error) => console.log(error)
    );
  }

  getAllCompanies():void{
    this.companyService.getAllCompanies().subscribe(res=>this.companies=res);
  } 

  getCompanyNameByCompanyId(companyId:string){
    let company= this.companies.filter(c=>(c.companyId+"")==companyId)[0];
    return company.name;
  }

  getAllProducts():void{
    this.productService.getAllProducts().subscribe(res=>{
      this.products=res;
    });
  }

  getProductNameByProductId(productId:string){
    // console.log(productId);
    // console.log(this.products);
    let product= this.products.filter(p=>(p.productId)==productId)[0];
    return product.name;
  }
}
