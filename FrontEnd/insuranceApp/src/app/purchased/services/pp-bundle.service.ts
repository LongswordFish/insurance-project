import { Injectable } from '@angular/core';
import { PurchasedBundle } from '../models/PurcahsedBundle.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PpBundleService {
  private bundleUrl:string = "http://localhost:9095/bundles/view";
  token:any;
  private bundle:PurchasedBundle;

  constructor(private httpClient: HttpClient) { 
    this.bundle={};
    this.token=sessionStorage.getItem("token");
  }

    fetchBundleByProductIdObs(bid:any){
      return this.httpClient.get(`${this.bundleUrl}/${bid}`,
        {
          headers:new HttpHeaders().set('Authorization','Bearer '+this.token)
        })
    }

}
