import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit 
{
  products!: Product[];
  productsWithCompanyName: ProductsWithCompanyName[] = [];
  displayedColumns: string[] = ['category', 'picture', 'name', 'description', 'price', 'companyId', 'isAvailable', 'actions'];
  companyName?:string;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts(){

    this.productService.getAllProducts().subscribe(
      
      async (products) => {
      
      // this.products = products;
      // console.log(products);
      for(let product of products){
        if(product.companyId != null && product.companyId != undefined){
          const value = await this.getCompanyNameBySenderId(product.companyId);
          const company: string | undefined = this.companyName;
          const productWithCompanyName: ProductsWithCompanyName = {
            productId: product.productId,
            category: product.category,
            picture:product.picture,
            name:product.name,
            description:product.description,
            price:product.price,
            locations:product.locations,
            companyId:product.companyId,
            available:product.available,
            companyName:company
          };
          this.productsWithCompanyName.push(productWithCompanyName);
          console.log(productWithCompanyName);
  
        }
      }
    });
  }
  
  async getCompanyNameBySenderId(id?: String){
    const res:any = await this.productService.getCompanyNameByCompanyId(id).toPromise();
    console.log(res.name);
    this.companyName = res.name;
    return this.companyName;
      
    }
}
export interface ProductsWithCompanyName {
  productId?: string;
    category?: string;
    picture?: string;
    name?: string;
    description?: string;
    price?: number;
    locations?: {
      locationName: string;
      locationPrice: number;
    }[];
    companyId?: string;
    available?: boolean;
    companyName?: string;
}


