import { Component } from '@angular/core';
import { User } from 'src/app/authentication/model/User.type';
import { AuthenticateService } from 'src/app/authentication/services/authenticate.service';

@Component({
  selector: 'app-side-company-dash',
  templateUrl: './side-company-dash.component.html',
  styleUrls: ['./side-company-dash.component.css']
})
export class SideCompanyDashComponent {
  user:User;

  constructor(private authenticationService:AuthenticateService){
    this.user={};

    this.authenticationService.getUserSubject()
    .subscribe(user=>{
      console.log(user);
      this.user=user;});
    
      let role = sessionStorage.getItem("role");
      let userId = sessionStorage.getItem("Userid");
      let token =sessionStorage.getItem("token");
      if(role!=undefined && userId!=undefined && token!=undefined){
        this.user = new User();
        this.user.role=role;
        this.user.Userid=userId;
      }
  }

  logout(){
    this.authenticationService.logout();
  }

}
