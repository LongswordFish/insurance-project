import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientmain',
  templateUrl: './clientmain.component.html',
  styleUrls: ['./clientmain.component.css']
})
export class ClientmainComponent {
  displayedColumns: string[] = ['product', 'price', 'quantity'];
  dataSource = [
    { id: 1, product: 'Product 1', price: 10, quantity: 100 },
    { id: 2, product: 'Product 2', price: 20, quantity: 200 },
    { id: 3, product: 'Product 3', price: 30, quantity: 300 },
    { id: 4, product: 'Product 4', price: 40, quantity: 400 },
  ];

  constructor(private router: Router) {}

  onProductClick(product: { id: any; }) {
    this.router.navigate(['/clientmain', product.id]);
  }
}
