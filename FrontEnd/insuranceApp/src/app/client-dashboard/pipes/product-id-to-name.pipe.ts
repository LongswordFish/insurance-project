import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { pp_Product } from '../../purchased/models/pp-Product.type';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from '../product.model';

@Pipe({
  name: 'productIdToName'
})
export class ProductIdToNamePipe implements PipeTransform {
  products:Product[]=[];
  constructor(private productService:ProductService){
    this.productService.getAllProducts().subscribe(res=>{
      // console.log(res);
      this.products=res;
      console.log(this.products);
    });
  }

  transform(productId: string): string {
    // console.log(this.products);
    let product = this.products.filter(p=>p.productId==productId)[0];
    // console.log(product);
    return product.name;
  }

}
