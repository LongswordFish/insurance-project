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
  displayedColumns: string[] = ['category', 'picture', 'name', 'description', 'price', 'companyId', 'isAvailable', 'actions'];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      console.log(products);
    });
  }
}

// {
//   displayedColumns: string[] = ['product', 'price', 'quantity'];
//   dataSource = [
//     { id: 1, product: 'Product 1', price: 10, quantity: 100 },
//     { id: 2, product: 'Product 2', price: 20, quantity: 200 },
//     { id: 3, product: 'Product 3', price: 30, quantity: 300 },
//     { id: 4, product: 'Product 4', price: 40, quantity: 400 },
//   ];

//   constructor(private router: Router) {}

//   onProductClick(product: { id: any; }) {
//     this.router.navigate(['/view-product', product.id]);
//   }
// }
