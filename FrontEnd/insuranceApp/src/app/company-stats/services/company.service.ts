import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient:HttpClient) {

   }

   getCompanyById(id?:string){
    return this.httpClient.get<any>(`http://localhost:9091/api/company/id/${id}`);
  }
}
