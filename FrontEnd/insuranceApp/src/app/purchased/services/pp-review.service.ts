import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pp_Review } from '../models/pp-Review.type';

@Injectable({
  providedIn: 'root'
})
export class PpReviewService {
  private reviewUrl:string = "http://localhost:9097/review";
  token:any;
  private product:pp_Review;
  private clientId:string|null=""
  constructor(private httpClient: HttpClient) { 
    this.product={};
    this.token=sessionStorage.getItem("token");
    this.clientId=sessionStorage.getItem("Userid");
  }

    fetchProductByProductId(pid:any){
      return this.httpClient.get(`${this.reviewUrl}/view/customer/${this.clientId}/product/${pid}`,
        {
          headers:new HttpHeaders().set('Authorization','Bearer '+this.token)
        })
    }
}
