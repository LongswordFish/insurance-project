import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {

  constructor(private http:HttpClient) { }

  // Get one company 
  getOneCompany(id: number){
    return this.http.get<any>("http://localhost:9091/api/company/id/"+id)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  // Update company 
  updateCompany(data:any, id:number){
    return this.http.put<any>("http://localhost:9091/api/company/update/"+id, data)
    .pipe(map((res:any) => {
      return res;
    }))
  }
}
