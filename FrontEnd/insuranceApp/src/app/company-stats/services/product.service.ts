import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform} from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  token = sessionStorage.getItem('token') as string | undefined;
  role = sessionStorage.getItem('role') as string | undefined;

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAllProductsByCompanyID(companyID: string): Observable<Array<Product>>{
    if (this.role !== 'company') {
      throw new Error('Access denied');
    }

    return this.httpClient.get<Array<Product>>(`http://localhost:9093/products/view/products-by-company/${companyID}`, this.httpOptions)                 
  }

  deleteProductByProductID(productID: string): Observable<Product> {
    if (this.role !== 'company') {
      throw new Error('Access denied');
    }

    return this.httpClient.delete<Product>(`http://localhost:9093/products/delete/${productID}`, {responseType: 'text' as 'json', headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token) });
  }

  updateProduct(productID: string, product: Product): Observable<Product> {
    if (this.role !== 'company') {
      throw new Error('Access denied');
    }

    return this.httpClient.put<Product>(`http://localhost:9093/products/update/${productID}`, product, this.httpOptions);
  }

  addProduct(product: any): Observable<Product> {
    if (this.role !== 'company') {
      throw new Error('Access denied');
    }

    return this.httpClient.post<Product>(`http://localhost:9093/products/add`, product, this.httpOptions);
  }


  //get company by companyID
  getCompanyByCompanyID(companyID: string): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:9091/api/company/id/${companyID}`);
  }

}
