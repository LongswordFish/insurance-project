import { Component } from '@angular/core';
import { AuthenticateService } from 'src/app/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authenticate:AuthenticateService){
  }
  userLogin(data:any){
    console.warn(data);
    this.authenticate.login(data);
  }
}
