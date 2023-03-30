import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    tokendata:any;
    email:any;
    constructor(private authenticate:AuthenticateService,private router:Router) {
    }

    ngOnInit(){
      this.tokendata=localStorage.getItem("token");
      this.email=localStorage.getItem("email");
    }
      logout(){
        this.authenticate.logout();
      }
      userRegister(data:any){
        console.warn(data);
        this.authenticate.register(data);
      }
    
}
