import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  cmptoken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODAxNTMzMzYsImV4cCI6MTcxMTY4OTMzNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJjb21wYW55In0.vhDwqEceK-VwZAlcXtxkfaKydwE94rQ24s4iItJT8gU";
  clienttoken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODAxNTMzMzYsImV4cCI6MTcxMTY4OTMzNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJjbGllbnQifQ.EnA9TesLJ_pRcM-hAtNTPwZdcQEWzkM83qDIcOifzIQ";

  cmphttpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.cmptoken
    })
  };

  clienthttpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.clienttoken
    })
  };

  constructor(private httpClient: HttpClient) { 

  }

  //get all purchased products to get client IDs, as each obj of it contains the clientID
  getAllPurhcasedProducts(productId: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:9094/api/v1/purchased/view/product/${productId}`, this.cmphttpOptions);
  }


  //get Client Details by clientID
  getClientDetailsByClientID(clientID: number): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:9092/api/Client/${clientID}`, this.clienthttpOptions);
  }

  //get Reviews by product ID:
  getReviewsByProductID(productID: string): Observable<Review>{
    return this.httpClient.get<Review>(`http://localhost:9097/review/view/product/${productID}`, this.clienthttpOptions)
  }
}
