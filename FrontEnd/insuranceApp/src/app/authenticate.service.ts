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
    this.http.post("http://localhost:9000/api/Auth/login",data)
    .subscribe((res:any)=>{
      console.warn(data),
      console.warn(res),
      sessionStorage.setItem("token",res.token);
      sessionStorage.setItem("Userid",res.userid);
      sessionStorage.setItem("role",data.role);
      this.router.navigate(['']);
    })
    
   }

   logout(){
    if(sessionStorage.getItem("token")!=null){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("Userid");
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
   }

   register(data:any){
    this.http.post("http://localhost:9000/api/Auth/register",data)
    .subscribe((res:any)=>{
      console.warn(res),
      console.log("Registration success")
      this.router.navigate(['/login']);
    })
   }
}
