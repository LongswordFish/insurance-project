import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../client-dashboard/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   private baseUrl = 'http://localhost:9093/products';
  // private baseUrl = 'http://localhost:3000/products';

  token: any;

  constructor(private http:HttpClient) { 
    this.token = sessionStorage.getItem("token");
  }
  

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/add`, product);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/view/all` ,
{
  headers:new HttpHeaders().set('Authorization','Bearer '+this.token)
    });
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

  getCompanyNameByCompanyId(id?: String): Observable<any> {
    return this.http.get<any>(`http://localhost:9091/api/company/id/${id}`);
  }

}
