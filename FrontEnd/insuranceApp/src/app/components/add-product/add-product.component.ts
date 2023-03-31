import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  products!: Product[];
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      picture: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      locations: this.fb.array([
        this.fb.group({
          locationName: ['', Validators.required],
          locationPrice: ['', [Validators.required, Validators.min(0)]],
        }),
      ]),
      companyId: [''],
      isAvailable: [true],
    });
    if (!this.products) {
      this.products = [];
    }
  }

  getProducts(): void {
    this.productService
      .getAllProducts()
      .subscribe((products) => (this.products = products));
  }

  addProduct(): void {
    const product = this.productForm.value;
    this.productService.createProduct(product).subscribe((newProduct) => {
      this.products.push(newProduct);
      this.productForm.reset();
    });
  }

  updateProduct(productId: string, updatedProduct: Product): void {
    this.productService
      .updateProduct(productId, updatedProduct)
      .subscribe(() => {
        const index = this.products.findIndex((p) => p.companyId === productId);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
      });
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      const index = this.products.findIndex((p) => p.companyId === productId);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
    });
  }

  get locations() {
    return this.productForm.get('locations') as FormArray;
  }

  addLocation() {
    const locationGroup = this.fb.group({
      locationName: ['', Validators.required],
      locationPrice: ['', [Validators.required, Validators.min(0)]],
    });
    this.locations.push(locationGroup);
  }

  removeLocation(index: number) {
    this.locations.removeAt(index);
  }
}
