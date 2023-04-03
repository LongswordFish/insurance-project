import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http:HttpClient,private router:Router) {
    
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
        this.router.navigate(['']);
    }
   }

   register(data:any){
    return this.http.post("http://localhost:9000/api/Auth/register",data);
   }
}
