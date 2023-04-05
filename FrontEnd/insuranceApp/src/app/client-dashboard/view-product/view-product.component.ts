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


