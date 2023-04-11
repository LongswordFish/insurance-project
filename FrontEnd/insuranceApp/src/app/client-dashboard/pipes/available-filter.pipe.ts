import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product.model';
import { ProductsWithCompanyName } from '../view-product/view-product.component';

@Pipe({
  name: 'availableFilter'
})
export class AvailableFilterPipe implements PipeTransform {

  transform(products: ProductsWithCompanyName[]): ProductsWithCompanyName[] {
    if (!products) {
      return [];
    }
    if(products.length==0) return products;
    return products.filter(p=>p.available);
  }

}
