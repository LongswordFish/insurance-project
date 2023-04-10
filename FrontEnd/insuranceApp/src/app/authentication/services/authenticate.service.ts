import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../model/User.type';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  user:User;
  userSubject:BehaviorSubject<User>

  constructor(private http:HttpClient,private router:Router) {
    this.user={};
    this.userSubject=new BehaviorSubject<User>({});
   }

   login(data:any){
    return this.http.post("http://localhost:9000/api/Auth/login",data);
    
   }

   logout(){
    if(sessionStorage.getItem("token")!=null){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("Userid");
        sessionStorage.removeItem("role");
        sessionStorage.clear();
        this.updateUserForNavbar({});
        this.router.navigate(['']);
    }
   }

   register(data:any){
    return this.http.post("http://localhost:9000/api/Auth/register",data);
   }

   updateUserForNavbar(user:User){
    this.user=user;
    this.userSubject.next(this.user);
   }

   getUserSubject():Observable<any>{
    return this.userSubject;
  }

  insertIntoClientTable(data:any){
    return this.http.post<any>(`http://localhost:9092/api/Client`,data);
  }
  
  getClientById(id?:string){
    return this.http.get<any>(`http://localhost:9092/api/Client/${id}`);
  }

  insertIntoCompanyTable(data:any){
    return this.http.post<any>(`http://localhost:9091/api/company/add`,data);
  }
  
  getCompanyById(id?:string){
    return this.http.get<any>(`http://localhost:9091/api/company/id/${id}`);
  }

}
