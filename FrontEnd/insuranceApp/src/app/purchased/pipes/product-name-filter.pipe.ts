import { Pipe, PipeTransform } from '@angular/core';
import { PurchasedProduct } from '../models/PurchasedProduct.type';

@Pipe({
  name: 'productNameFilter'
})
export class ProductNameFilterPipe implements PipeTransform {

  transform(pps: PurchasedProduct[], searchText: any): PurchasedProduct[] {
    if(searchText==null || searchText===''){
      return pps;
    }
  
      return pps.filter(pp=>{
        return  pp?.productName?.toLowerCase().includes(searchText.toLowerCase());
      })
  }

}
