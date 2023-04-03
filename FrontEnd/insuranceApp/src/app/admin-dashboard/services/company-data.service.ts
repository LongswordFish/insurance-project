import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {

  constructor(private http:HttpClient) { }

  // Get all companies 
  getAllCompanies(){
    return this.http.get<any>("http://localhost:9091/api/company")
    .pipe(map((res:any) => {
      return res;
    }))
  }

  // Approve company
  approveCompany(id:number){
    return this.http.put<any>("http://localhost:9091/api/company/approve/"+id, null)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  // Reject company
  rejectCompany(id:number){
    return this.http.put<any>("http://localhost:9091/api/company/disapprove/"+id, null)
    .pipe(map((res:any) => {
      return res;
    }))
  }
}
