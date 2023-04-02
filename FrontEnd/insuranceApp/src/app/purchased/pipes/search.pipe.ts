import { Pipe, PipeTransform } from '@angular/core';
import { PurchasedProduct } from '../models/PurchasedProduct.type';
import { PurchasedBundle } from '../models/PurcahsedBundle.type';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(bundles: PurchasedBundle[], searchText: any): any {
    if(searchText==null || searchText===''){
      return bundles;
    }
  
      return bundles.filter(b=>{
  
        return  b?.bundlename?.toLowerCase().includes(searchText.toLowerCase());
      })
  }

}
