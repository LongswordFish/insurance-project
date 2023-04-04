import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:9093/products';

  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/add`, product);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/view/all`);
  }

  updateProduct(productId: string, product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.baseUrl}/update/${productId}`,
      product
    );
  }

  deleteProduct(productId: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${productId}`);
  }

  getProductByProductId(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/view/${productId}`);
  }

  getProductsByCompanyId(companyId: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}/view/products-by-company/${companyId}`
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}/view/products-by-category/${category}`
    );
  }

  deleteProductsByCompanyId(companyId: string): Observable<string> {
    return this.http.delete<string>(
      `${this.baseUrl}/delete/products-by-company/${companyId}`
    );
  }

  viewAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/view/products-available`);
  }

  viewAvailableProductsByCompanyId(companyId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/view/all/${companyId}`);
  }

  setProductAvailableByProductId(productId: string): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/update/setProductAvailability/${productId}`,
      null
    );
  }

  getProductsByLocationName(locationName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/location/${locationName}`);
  }
}
