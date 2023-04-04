import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pp_Review } from '../models/pp-Review.type';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  token: any;

  httpOptions:any = {};

  constructor(private httpclient:HttpClient) {
    this.token=sessionStorage.getItem("token");
    this.httpOptions={
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  saveReview(review:pp_Review) :Observable<any>
  {
    return this.httpclient.post('http://localhost:9097/review/add',review,this.httpOptions)
  }

  viewReview(reviewId:string) :Observable<pp_Review>
  {
    return this.httpclient.get('http://localhost:9097/review/view/${reviewId}')
  }
}
