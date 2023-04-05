import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientDataService {

  constructor(private http:HttpClient) { }

  // Get one client 
  getOneClient(id: number){
    return this.http.get<any>("http://localhost:9092/api/Client/"+id)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  // Update client
  updateClient(data:any, id:number){
    return this.http.put<any>("http://localhost:9092/api/Client/"+id, data)
    .pipe(map((res:any) => {
      return res;
    }))
  }
}
