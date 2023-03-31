import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, tap } from 'rxjs';
import { PurchasedBundle } from '../models/PurcahsedBundle.type';
import { PurchasedProduct } from '../models/PurchasedProduct.type';

@Injectable({
  providedIn: 'root'
})
export class PurchasedService {
  private purchasedUrl:string = "http://localhost:9094/api/v1/purchased";
  token:any;
  private ppList:PurchasedProduct[];
  private pbList:PurchasedProduct[];
  private ppListBehaviour: BehaviorSubject<PurchasedProduct[]>;
  private pbListBehaviour: BehaviorSubject<PurchasedProduct[]>;
  constructor(private httpClient: HttpClient) { 
    this.ppList=[];
    this.pbList=[];
    this.ppListBehaviour=new BehaviorSubject<PurchasedProduct[]>([]);
    this.pbListBehaviour=new BehaviorSubject<PurchasedProduct[]>([]);
    this.token=sessionStorage.getItem("token");
  }

    // fetchAllPurchasedData()
    // {
    //   return this.httpClient.get(this.purchasedUrl,
    //     {
    //       headers:new HttpHeaders().set('Authorization','Bearer '+this.token)
    //     }).subscribe(
    //       (res:any)=>
    //       {
    //         this.ppList=res;
    //         this.ppListBehaviour?.next(this.ppList);
    //       }
    //     )
    // }
    getPurchasedData():Observable<any>{
      return this.ppListBehaviour;
    }

    fetchPurchasedDataByClientId(id:any){
      return this.httpClient.get(`${this.purchasedUrl}/view/notbundle/client/${id}`,
        {
          headers:new HttpHeaders().set('Authorization','Bearer '+this.token)
        }).subscribe(
          (res:any)=>
          {
            this.ppList=res;
            this.ppListBehaviour?.next(this.ppList);
          }
        )
    }



    deletePPByPPId(ppid:any):Observable<any>{
      return this.httpClient.delete<any>(`${this.purchasedUrl}/delete/${ppid}`, {responseType: 'text' as 'json', headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token) })
      .pipe(
        tap(
            res=>{
            this.ppList=this.ppList.filter(p=>p.ppId!=ppid);
            this.pbListBehaviour?.next(this.ppList);
            return this.ppList;
          }
        )
      )
    }


    fetchPurchasedBundleDataByClientId(id:any){
      return this.httpClient.get(`${this.purchasedUrl}/view/client/${id}`,
        {
          headers:new HttpHeaders().set('Authorization','Bearer '+this.token)
        }).subscribe(
          (res:any)=>
          {
            this.pbList=res;
            this.pbListBehaviour?.next(this.pbList);
          }
        )
    }

    deleteBundleByPPIds(ppids:any[],cliengId:string):Observable<any>{
      let deleteCalls:any[]=[];
      ppids.forEach(ppid=>{
        deleteCalls.push(this.httpClient.delete<any>(`${this.purchasedUrl}/delete/${ppid}`, {responseType: 'text' as 'json', headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token) }));
      })
    
      return forkJoin(deleteCalls).pipe(
        tap(
            res=>{
              this.fetchPurchasedBundleDataByClientId(cliengId);
            return res;
          }
        )
      )

    }

    getPurchasedBundleData():Observable<any>{
      return this.pbListBehaviour;
    }

    postPurchased(pp:PurchasedProduct):Observable<any>{
      return this.httpClient.post<PurchasedProduct>(`${this.purchasedUrl}/add`,pp,
      {
        headers:new HttpHeaders().set('Authorization','Bearer '+this.token)
      }) ;
    }
    
  }


