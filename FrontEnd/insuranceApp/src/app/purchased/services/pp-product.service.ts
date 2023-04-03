import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pp_Product } from '../models/pp-Product.type';

@Injectable({
  providedIn: 'root'
})
export class PpProductService {
  private purchasedUrl:string = "http://localhost:9093/products";
  token:any;
  private product:pp_Product;

  private productBehaviour: BehaviorSubject<pp_Product>;

  constructor(private httpClient: HttpClient) { 
    this.product={};
    this.productBehaviour=new BehaviorSubject<pp_Product>({});
    this.token=sessionStorage.getItem("token");
  }

    fetchProductByProductId(pid:any){
      return this.httpClient.get(`${this.purchasedUrl}/view/${pid}`,
        {
          headers:new HttpHeaders().set('Authorization','Bearer '+this.token)
        })
    }

    getProductData():Observable<any>{
      return this.productBehaviour;
    }
}
