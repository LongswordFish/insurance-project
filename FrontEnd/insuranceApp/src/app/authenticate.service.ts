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
      console.warn(res),
      localStorage.setItem("token",res.token);
      localStorage.setItem("email",data.email);
      this.router.navigate(['']);
    })
   }

   logout(){
    if(localStorage.getItem("token")!=null && localStorage.getItem("email")!=null){
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.clear();
        this.router.navigate(['']);
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
