import { Pipe, PipeTransform } from '@angular/core';
import { PurchasedProduct } from '../models/PurchasedProduct.type';

@Pipe({
  name: 'productCategoryFilter'
})
export class ProductCategoryFilterPipe implements PipeTransform {

  transform(pps: PurchasedProduct[], category: any): PurchasedProduct[] {
    if(category==null || category=="" || category==='All'){
      return pps;
    }
  
      return pps.filter(pp=>{
        return  pp?.productCategory?.toLowerCase().includes(category.toLowerCase());
      })
  }

}
