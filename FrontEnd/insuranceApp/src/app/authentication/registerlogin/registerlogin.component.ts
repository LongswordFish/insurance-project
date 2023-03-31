import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthenticateService } from 'src/app/authenticate.service';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal'; 

@Component({
  selector: 'app-registerlogin',
  templateUrl: './registerlogin.component.html',
  styleUrls: ['./registerlogin.component.css']
})


export class RegisterloginComponent {
  tokendata:any;
  email:any;
  modalRef: any;
  errorlist:any[]=[];
  modalMessage:any;
  constructor(private authenticate:AuthenticateService,private modalService:BsModalService){
   
  }

  @ViewChild('template', { static: true }) modal : any;

  userLogin(data:any){
    console.warn(data);
    this.authenticate.login(data);
  }
  // ngOnInit(){
  //   this.tokendata=sessionStorage.getItem("token");
  //   this.email=sessionStorage.getItem("UserId");
  //   this.email=sessionStorage.getItem("Role");
  // }
    logout(){
      this.authenticate.logout();
    }
    userRegister(data:any){

      this.authenticate.register(data);
      this.modalMessage = "Your Registration Was Successful";
      this.modalRef = this.modalService.show(this.modal);
    }
}
