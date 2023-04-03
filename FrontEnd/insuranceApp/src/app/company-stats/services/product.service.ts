import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform} from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODAxNTMzMzYsImV4cCI6MTcxMTY4OTMzNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJjb21wYW55In0.vhDwqEceK-VwZAlcXtxkfaKydwE94rQ24s4iItJT8gU";

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
  };

  constructor(private httpClient: HttpClient) { }

  //getting all the products by the company id
  getAllProductsByCompanyID(companyID: string): Observable<Array<Product>>{
    return this.httpClient.get<Array<Product>>(`http://localhost:9093/products/view/products-by-company/${companyID}`, this.httpOptions)                 
  }

  //delete a product by productID
  deleteProductByProductID(productID: string): Observable<Product> {
    return this.httpClient.delete<Product>(`http://localhost:9093/products/delete/${productID}`, {responseType: 'text' as 'json', headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token) });
  }

  //update a product by productID
  updateProduct(productID: string, product: Product): Observable<Product> {
    // console.log(product);
    return this.httpClient.put<Product>(`http://localhost:9093/products/update/${productID}`, product, this.httpOptions);
  }

  //add a product
  addProduct(product: any): Observable<Product> {
    return this.httpClient.post<Product>(`http://localhost:9093/products/add`, product, this.httpOptions);
  }
}
