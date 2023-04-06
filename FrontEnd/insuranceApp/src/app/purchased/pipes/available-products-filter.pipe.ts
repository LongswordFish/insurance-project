import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/client-dashboard/product.model';

@Pipe({
  name: 'availableProductsFilter'
})
export class AvailableProductsFilterPipe implements PipeTransform {

  transform(products: Product[]): Product[] {
    if(products.length==0) return products;
    return products.filter(p=>p.available);
  }

}
